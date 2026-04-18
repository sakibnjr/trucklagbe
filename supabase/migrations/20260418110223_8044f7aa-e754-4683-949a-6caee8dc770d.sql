-- Remove the overly permissive public SELECT policy on bookings
DROP POLICY IF EXISTS "Anyone can view bookings by phone lookup" ON public.bookings;

-- Only admins and staff can view bookings
CREATE POLICY "Admins and staff can view bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'staff'::app_role)
  );

-- Allow staff to update bookings as well (previously only admins could)
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
CREATE POLICY "Admins and staff can update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'staff'::app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'staff'::app_role)
  );