-- Harden has_role to prevent cross-user role enumeration
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    case
      when _user_id is distinct from auth.uid() then
        (
          auth.uid() is not null
          and exists (
            select 1
            from public.user_roles ur_admin
            where ur_admin.user_id = auth.uid()
              and ur_admin.role = 'admin'::public.app_role
          )
          and exists (
            select 1
            from public.user_roles ur_target
            where ur_target.user_id = _user_id
              and ur_target.role = _role
          )
        )
      else
        exists (
          select 1
          from public.user_roles ur
          where ur.user_id = _user_id
            and ur.role = _role
        )
    end;
$$;

-- Harden get_user_roles to prevent role disclosure
create or replace function public.get_user_roles(_user_id uuid)
returns setof public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select ur.role
  from public.user_roles ur
  where ur.user_id = _user_id
    and (
      _user_id = auth.uid()
      or (
        auth.uid() is not null
        and exists (
          select 1
          from public.user_roles ur_admin
          where ur_admin.user_id = auth.uid()
            and ur_admin.role = 'admin'::public.app_role
        )
      )
    );
$$;

-- Limit who can call these functions directly
revoke execute on function public.has_role(uuid, public.app_role) from public;
grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated, service_role;

revoke execute on function public.get_user_roles(uuid) from public;
grant execute on function public.get_user_roles(uuid) to authenticated, service_role;
