CREATE TABLE public.availability (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    restaurant_id uuid NOT NULL,
    date DATE NOT NULL,
    configuration JSONB NOT NULL,
    availabilities JSONB NOT NULL
);

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.availability
    ADD UNIQUE (restaurant_id, date)