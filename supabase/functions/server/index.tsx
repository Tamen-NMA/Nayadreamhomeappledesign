import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client (for auth verification)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Helper to verify auth token
async function verifyAuth(authHeader: string | null) {
  if (!authHeader) {
    console.log('❌ No auth header provided');
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('❌ No token found in auth header');
    return null;
  }

  console.log('🔍 Verifying token (first 20 chars):', token.substring(0, 20) + '...');
  console.log('🔍 Token length:', token.length);

  try {
    // Use the anon key client for user verification, not service role
    const anonClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
    
    const { data: { user }, error } = await anonClient.auth.getUser(token);
    if (error) {
      console.error('❌ Auth verification error:', {
        message: error.message,
        status: error.status,
        code: error.code,
        name: error.name
      });
      return null;
    }
    if (!user) {
      console.error('❌ No user found for token');
      return null;
    }
    
    console.log('✅ User verified:', user.id, user.email);
    return user;
  } catch (error: any) {
    console.error('❌ Exception during auth verification:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    return null;
  }
}

// Health check endpoint
app.get("/make-server-ba08a5a4/health", (c) => {
  return c.json({ status: "ok" });
});

// ===== AUTH ROUTES =====

app.post("/make-server-ba08a5a4/auth/signup", async (c) => {
  try {
    const { email, password, displayName } = await c.req.json();

    console.log('Signup attempt for email:', email);

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { display_name: displayName },
      email_confirm: true, // Auto-confirm since email server isn't configured
    });

    if (error) {
      console.error('Supabase createUser error:', error);
      throw error;
    }

    console.log('User created successfully:', data.user?.id);
    return c.json({ user: data.user });
  } catch (error: any) {
    console.error('Signup error:', error);
    return c.json({ error: error.message }, 400);
  }
});

app.post("/make-server-ba08a5a4/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    // Use a per-request client to avoid polluting the server's auth state
    const perRequestClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    const { data, error } = await perRequestClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return c.json({ session: data.session, user: data.user });
  } catch (error: any) {
    console.error('Sign in error:', error);
    return c.json({ error: error.message }, 400);
  }
});

// ===== USER ROUTES =====

app.get("/make-server-ba08a5a4/user", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const userData = await kv.get(`user:${user.id}`);
    return c.json(userData || {
      id: user.id,
      email: user.email,
      displayName: user.user_metadata?.display_name || '',
      country: null,
      dietaryRestrictions: [],
      cuisinePreferences: [],
      currentPlan: 'free',
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-ba08a5a4/user", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const updates = await c.req.json();
    const existing = await kv.get(`user:${user.id}`) || {};
    const updated = { ...existing, ...updates };
    await kv.set(`user:${user.id}`, updated);
    return c.json(updated);
  } catch (error: any) {
    console.error('Update user error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-ba08a5a4/user/country", async (c) => {
  console.log('📍 Set country endpoint called');
  console.log('📍 Authorization header:', c.req.header('Authorization')?.substring(0, 30) + '...');
  
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) {
    console.log('📍 User verification failed, returning 401');
    return c.json({ code: 401, message: 'Invalid JWT' }, 401);
  }

  try {
    const body = await c.req.json();
    console.log('📍 Request body:', body);
    const { country } = body;
    console.log('📍 Setting country for user:', user.id, 'to:', country);
    
    const existing = await kv.get(`user:${user.id}`) || {};
    const updated = { ...existing, id: user.id, email: user.email, country };
    await kv.set(`user:${user.id}`, updated);
    console.log('📍 Country set successfully');
    return c.json({ success: true });
  } catch (error: any) {
    console.error('📍 Set country error:', error);
    return c.json({ code: 500, message: error.message }, 500);
  }
});

app.post("/make-server-ba08a5a4/user/avatar", async (c) => {
  console.log('🖼️ Avatar upload endpoint called');
  
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) {
    console.log('🖼️ User verification failed, returning 401');
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    // Ensure the avatars bucket exists
    const bucketName = 'make-ba08a5a4-avatars';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log(`🖼️ Creating bucket: ${bucketName}`);
      const { error: bucketError } = await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 2097152, // 2MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
      });
      if (bucketError) {
        console.error('🖼️ Failed to create bucket:', bucketError);
        throw bucketError;
      }
    }

    // Parse the form data
    const formData = await c.req.formData();
    const file = formData.get('avatar') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    console.log(`🖼️ Uploading avatar for user ${user.id}, file size: ${file.size} bytes`);

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('🖼️ Upload error:', error);
      throw error;
    }

    // Create signed URL (valid for 1 year)
    const { data: signedUrl } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000); // 1 year in seconds

    if (!signedUrl) {
      throw new Error('Failed to create signed URL');
    }

    const avatarUrl = signedUrl.signedUrl;
    console.log(`🖼️ Avatar uploaded successfully: ${avatarUrl.substring(0, 50)}...`);

    // Update user record with avatar URL
    const existing = await kv.get(`user:${user.id}`) || {};
    const updated = { ...existing, id: user.id, email: user.email, avatarUrl };
    await kv.set(`user:${user.id}`, updated);

    return c.json({ avatarUrl });
  } catch (error: any) {
    console.error('🖼️ Avatar upload error:', error);
    return c.json({ error: error.message || 'Failed to upload avatar' }, 500);
  }
});

// ===== HOUSEHOLD MEMBERS ROUTES =====

app.get("/make-server-ba08a5a4/members", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const members = await kv.getByPrefix(`member:${user.id}:`);
    return c.json(members.map(m => m.value));
  } catch (error: any) {
    console.error('Get members error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-ba08a5a4/members", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const memberData = await c.req.json();
    const id = `member_${Date.now()}`;
    const member = { ...memberData, id };
    await kv.set(`member:${user.id}:${id}`, member);
    return c.json(member);
  } catch (error: any) {
    console.error('Create member error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-ba08a5a4/members/:id", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const existing = await kv.get(`member:${user.id}:${id}`);
    if (!existing) return c.json({ error: 'Member not found' }, 404);
    
    const updated = { ...existing, ...updates };
    await kv.set(`member:${user.id}:${id}`, updated);
    return c.json(updated);
  } catch (error: any) {
    console.error('Update member error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-ba08a5a4/members/:id", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    await kv.del(`member:${user.id}:${id}`);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete member error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.get("/make-server-ba08a5a4/members/:id/share-link", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    const token = `share_${user.id}_${id}_${Date.now()}`;
    await kv.set(`sharetoken:${token}`, { userId: user.id, memberId: id });
    const shareLink = `${c.req.url.split('/make-server')[0]}/my-tasks/${token}`;
    return c.json({ shareLink });
  } catch (error: any) {
    console.error('Generate share link error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ===== CHORE SCHEDULES ROUTES =====

app.get("/make-server-ba08a5a4/chores", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const schedules = await kv.getByPrefix(`chore:${user.id}:`);
    return c.json(schedules.map(s => s.value));
  } catch (error: any) {
    console.error('Get chores error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.get("/make-server-ba08a5a4/chores/:id", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    const schedule = await kv.get(`chore:${user.id}:${id}`);
    if (!schedule) return c.json({ error: 'Schedule not found' }, 404);
    return c.json(schedule);
  } catch (error: any) {
    console.error('Get chore schedule error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-ba08a5a4/chores", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const scheduleData = await c.req.json();
    const id = `schedule_${Date.now()}`;
    const schedule = { ...scheduleData, id };
    await kv.set(`chore:${user.id}:${id}`, schedule);
    return c.json(schedule);
  } catch (error: any) {
    console.error('Create chore schedule error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-ba08a5a4/chores/:id", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const existing = await kv.get(`chore:${user.id}:${id}`);
    if (!existing) return c.json({ error: 'Schedule not found' }, 404);
    
    const updated = { ...existing, ...updates };
    await kv.set(`chore:${user.id}:${id}`, updated);
    return c.json(updated);
  } catch (error: any) {
    console.error('Update chore schedule error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-ba08a5a4/chores/:id", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    await kv.del(`chore:${user.id}:${id}`);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete chore schedule error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-ba08a5a4/chores/:id/generate", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    const schedule = await kv.get(`chore:${user.id}:${id}`);
    if (!schedule) return c.json({ error: 'Schedule not found' }, 404);

    // Get household members for context
    const members = await kv.getByPrefix(`member:${user.id}:`);

    // AI-generated tasks (simulated - replace with real AI API call)
    const aiTasks = generateAIChores(members.map(m => m.value));

    const updated = { 
      ...schedule, 
      tasks: [...schedule.tasks, ...aiTasks],
      isAIGenerated: true 
    };
    await kv.set(`chore:${user.id}:${id}`, updated);
    return c.json(updated);
  } catch (error: any) {
    console.error('Generate chores error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ===== MEAL PLANS ROUTES =====

app.get("/make-server-ba08a5a4/meals", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const plans = await kv.getByPrefix(`meal:${user.id}:`);
    return c.json(plans.map(p => p.value));
  } catch (error: any) {
    console.error('Get meals error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-ba08a5a4/meals", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const planData = await c.req.json();
    const id = `mealplan_${Date.now()}`;
    const plan = { ...planData, id };
    await kv.set(`meal:${user.id}:${id}`, plan);
    return c.json(plan);
  } catch (error: any) {
    console.error('Create meal plan error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ===== SHARED TASKS ROUTES (No Auth Required) =====

app.get("/make-server-ba08a5a4/shared/:token", async (c) => {
  try {
    const token = c.req.param('token');
    const tokenData = await kv.get(`sharetoken:${token}`);
    if (!tokenData) return c.json({ error: 'Invalid token' }, 404);

    const { userId, memberId } = tokenData;
    
    // Get member info
    const member = await kv.get(`member:${userId}:${memberId}`);
    
    // Get tasks assigned to this member
    const schedules = await kv.getByPrefix(`chore:${userId}:`);
    const tasks: any[] = [];
    
    schedules.forEach(s => {
      const schedule = s.value;
      schedule.tasks.forEach((task: any) => {
        if (task.assigneeId === memberId) {
          tasks.push({ ...task, scheduleName: schedule.title });
        }
      });
    });

    return c.json({ member, tasks });
  } catch (error: any) {
    console.error('Get shared tasks error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Helper function to generate AI chores (simulated)
function generateAIChores(members: any[]) {
  const taskTemplates = [
    { title: 'Clean the kitchen', emoji: '🍳', priority: 'high' },
    { title: 'Do the laundry', emoji: '🧺', priority: 'medium' },
    { title: 'Vacuum living room', emoji: '🧹', priority: 'medium' },
    { title: 'Water plants', emoji: '🌱', priority: 'low' },
    { title: 'Take out trash', emoji: '🗑️', priority: 'high' },
    { title: 'Make beds', emoji: '🛏️', priority: 'low' },
    { title: 'Wash dishes', emoji: '🍽️', priority: 'high' },
  ];

  const tasks = [];
  const days = [0, 1, 2, 3, 4, 5, 6]; // All days of week

  for (let day of days) {
    // Add 2-3 tasks per day
    const numTasks = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numTasks; i++) {
      const template = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
      const assignee = members[Math.floor(Math.random() * members.length)];
      
      tasks.push({
        id: `aitask_${Date.now()}_${day}_${i}`,
        title: template.title,
        emoji: template.emoji,
        priority: template.priority,
        day,
        completed: false,
        assigneeId: assignee?.id,
        description: 'AI-generated task',
      });
    }
  }

  return tasks;
}

Deno.serve(app.fetch);