CREATE TABLE public.restaurant_user (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    restaurant_id uuid NOT NULL,
    user_id uuid NOT NULL
);

ALTER TABLE ONLY public.restaurant_user
    ADD CONSTRAINT restaurant_user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.restaurant_user
    ADD CONSTRAINT restaurant_user_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restaurant_user
    ADD CONSTRAINT restaurant_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
