-- 1. Fix function search_path
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- 2. Lock down function execution
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- 3. Restrict quotes SELECT to owner or admin
DROP POLICY IF EXISTS "Users can view own quotes" ON public.quotes;
CREATE POLICY "Users can view own quotes"
ON public.quotes FOR SELECT TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quotes" ON public.quotes;
CREATE POLICY "Users can insert own quotes"
ON public.quotes FOR INSERT TO anon, authenticated
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 4. Tighten table grants
REVOKE ALL ON public.quotes, public.contact_submissions, public.orders, public.cart,
  public.wishlist, public.profiles, public.user_roles FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.cart TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.wishlist TO authenticated;
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT, INSERT ON public.quotes TO authenticated;
GRANT INSERT ON public.quotes TO anon;
GRANT SELECT, INSERT ON public.contact_submissions TO authenticated;
GRANT INSERT ON public.contact_submissions TO anon;

GRANT ALL ON public.quotes, public.contact_submissions, public.orders, public.cart,
  public.wishlist, public.profiles, public.user_roles TO service_role;