CREATE TABLE task (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    status TEXT CHECK (status IN ('pendiente', 'completada')) NOT NULL
);