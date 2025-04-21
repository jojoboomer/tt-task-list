export type Database = {
  public: {
    Tables: {
      task_list: {
        Row: {
          created_at: string;
          id: string;
          status: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status: string;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

