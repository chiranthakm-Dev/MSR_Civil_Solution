export type UserRole = 'customer' | 'employee' | 'admin';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string | null;
          role: UserRole;
          city: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          phone?: string | null;
          role?: UserRole;
          city?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          project_type: string;
          message: string;
          attachment_url: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          project_type: string;
          message: string;
          attachment_url?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['enquiries']['Insert']>;
      };
      rate_config: {
        Row: {
          id: string;
          parameter_key: string;
          parameter_value: Json;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          parameter_key: string;
          parameter_value: Json;
          updated_by?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['rate_config']['Insert']>;
      };
      quotes: {
        Row: {
          id: string;
          customer_id: string;
          inputs_json: Json;
          output_json: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          inputs_json: Json;
          output_json: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['quotes']['Insert']>;
      };
      attendance: {
        Row: {
          id: string;
          employee_id: string;
          date: string;
          marked_at: string;
          marked_by: string;
          type: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          date: string;
          marked_at?: string;
          marked_by: string;
          type?: string;
        };
        Update: Partial<Database['public']['Tables']['attendance']['Insert']>;
      };
      progress_reports: {
        Row: {
          id: string;
          project_id: string;
          employee_id: string;
          stage: string;
          notes: string | null;
          progress_pct: number;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          employee_id: string;
          stage: string;
          notes?: string | null;
          progress_pct: number;
          submitted_at?: string;
        };
        Update: Partial<Database['public']['Tables']['progress_reports']['Insert']>;
      };
    };
  };
};
