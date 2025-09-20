export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          affiliate_link_id: string | null
          clicked_at: string | null
          id: string
          ip_address: unknown | null
          referrer: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          affiliate_link_id?: string | null
          clicked_at?: string | null
          id?: string
          ip_address?: unknown | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          affiliate_link_id?: string | null
          clicked_at?: string | null
          id?: string
          ip_address?: unknown | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_affiliate_link_id_fkey"
            columns: ["affiliate_link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_links: {
        Row: {
          affiliate_url: string
          commission_rate: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          partner_name: string | null
          tool_id: string
        }
        Insert: {
          affiliate_url: string
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          partner_name?: string | null
          tool_id: string
        }
        Update: {
          affiliate_url?: string
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          partner_name?: string | null
          tool_id?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          session_id: string | null
          tool_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          tool_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          tool_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      premium_content: {
        Row: {
          content: string | null
          content_type: string
          created_at: string | null
          data: Json | null
          id: string
          required_tier: string | null
          title: string
          tool_id: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          content_type: string
          created_at?: string | null
          data?: Json | null
          id?: string
          required_tier?: string | null
          title: string
          tool_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          content_type?: string
          created_at?: string | null
          data?: Json | null
          id?: string
          required_tier?: string | null
          title?: string
          tool_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_vendor: boolean | null
          privacy_preferences: Json | null
          subscription_expires_at: string | null
          subscription_tier: string | null
          updated_at: string | null
          vendor_company: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_vendor?: boolean | null
          privacy_preferences?: Json | null
          subscription_expires_at?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          vendor_company?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_vendor?: boolean | null
          privacy_preferences?: Json | null
          subscription_expires_at?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          vendor_company?: string | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          severity: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tool_submissions: {
        Row: {
          category: string | null
          features: string[] | null
          id: string
          is_sponsored: boolean | null
          logo_url: string | null
          pricing_details: Json | null
          pricing_model: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          sponsored_until: string | null
          status: string | null
          submitted_at: string | null
          tool_description: string | null
          tool_name: string
          tool_url: string | null
          vendor_id: string | null
        }
        Insert: {
          category?: string | null
          features?: string[] | null
          id?: string
          is_sponsored?: boolean | null
          logo_url?: string | null
          pricing_details?: Json | null
          pricing_model?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sponsored_until?: string | null
          status?: string | null
          submitted_at?: string | null
          tool_description?: string | null
          tool_name: string
          tool_url?: string | null
          vendor_id?: string | null
        }
        Update: {
          category?: string | null
          features?: string[] | null
          id?: string
          is_sponsored?: boolean | null
          logo_url?: string | null
          pricing_details?: Json | null
          pricing_model?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sponsored_until?: string | null
          status?: string | null
          submitted_at?: string | null
          tool_description?: string | null
          tool_name?: string
          tool_url?: string | null
          vendor_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      anonymize_old_analytics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_affiliate_clicks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_analytics_events: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_analytics_summary: {
        Args: { end_date?: string; start_date?: string }
        Returns: {
          event_count: number
          event_type: string
          unique_users: number
        }[]
      }
      log_security_event: {
        Args: {
          p_event_data?: Json
          p_event_type: string
          p_ip_address?: unknown
          p_severity?: string
          p_user_agent?: string
          p_user_id?: string
        }
        Returns: undefined
      }
      user_allows_analytics: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
