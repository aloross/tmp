SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE FUNCTION public.set_slug_from_name() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.slug := slugify(NEW.name);
  RETURN NEW;
END
$$;
CREATE FUNCTION public.slugify(value text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $_$
  -- removes accents (diacritic signs) from a given string --
  WITH "unaccented" AS (
    SELECT unaccent("value") AS "value"
  ),
  -- lowercases the string
  "lowercase" AS (
    SELECT lower("value") AS "value"
    FROM "unaccented"
  ),
  -- remove single and double quotes
  "removed_quotes" AS (
    SELECT regexp_replace("value", '[''"]+', '', 'gi') AS "value"
    FROM "lowercase"
  ),
  -- replaces anything that's not a letter, number, hyphen('-'), or underscore('_') with a hyphen('-')
  "hyphenated" AS (
    SELECT regexp_replace("value", '[^a-z0-9\\-_]+', '-', 'gi') AS "value"
    FROM "removed_quotes"
  ),
  -- trims hyphens('-') if they exist on the head or tail of the string
  "trimmed" AS (
    SELECT regexp_replace(regexp_replace("value", '\-+$', ''), '^\-', '') AS "value"
    FROM "hyphenated"
  )
  SELECT "value" FROM "trimmed";
$_$;
CREATE TABLE public.accounts (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    "userId" uuid NOT NULL,
    refresh_token_expires_in integer
);
CREATE TABLE public.customer (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    data jsonb
);
CREATE TABLE public.reservation (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    date timestamp with time zone NOT NULL,
    status text NOT NULL,
    customer_id uuid,
    restaurant_id uuid
);
CREATE TABLE public.reservation_status_enum (
    value text NOT NULL
);
CREATE TABLE public.restaurant (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL
);
CREATE TABLE public.sessions (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid NOT NULL,
    expires timestamp with time zone
);
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text
);
CREATE TABLE public.verification_tokens (
    token text NOT NULL,
    identifier text NOT NULL,
    expires timestamp with time zone
);
COPY public.accounts (id, type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, oauth_token_secret, oauth_token, "userId", refresh_token_expires_in) FROM stdin;
\.
COPY public.customer (id, data) FROM stdin;
becbe285-63b3-44a0-903c-f16c0c187ed4	\N
dd92dcc0-f7a1-420c-a28b-d1b2735b3a19	\N
9e7bdc12-6125-404e-a388-d00012c99d3e	\N
\.
COPY public.reservation (id, created_at, updated_at, date, status, customer_id, restaurant_id) FROM stdin;
26662e3d-6145-42c5-99b0-d5facfe77323	2022-10-28 07:47:41.885364+00	2022-10-28 12:44:14.70376+00	2022-10-30 17:46:47.212+00	CONFIRM	becbe285-63b3-44a0-903c-f16c0c187ed4	2d95c42b-dea7-4977-95f5-9a1d20c7afdd
efdc09c7-627a-4c30-bc19-000180148df2	2022-10-28 07:47:32.609094+00	2022-10-28 12:44:31.363762+00	2022-10-30 07:46:47.212+00	REQUEST	becbe285-63b3-44a0-903c-f16c0c187ed4	2fd08528-d754-4854-8710-797d2299cca3
3f32644d-4fd6-4785-bcb2-28617bfc35f1	2022-10-28 07:47:53.616527+00	2022-10-28 13:00:30.895283+00	2022-10-29 12:12:47.212+00	CANCEL	becbe285-63b3-44a0-903c-f16c0c187ed4	2d95c42b-dea7-4977-95f5-9a1d20c7afdd
\.
COPY public.reservation_status_enum (value) FROM stdin;
REQUEST
CONFIRM
CANCEL
\.
COPY public.restaurant (id, created_at, updated_at, name, slug) FROM stdin;
2d95c42b-dea7-4977-95f5-9a1d20c7afdd	2022-10-28 12:39:33.667994+00	2022-10-28 12:39:33.667994+00	salut les loulous	salut-les-loulous
2fd08528-d754-4854-8710-797d2299cca3	2022-10-28 12:41:05.301624+00	2022-10-28 12:41:05.301624+00	la grande fête	la-grande-fete
\.
COPY public.sessions (id, "sessionToken", "userId", expires) FROM stdin;
\.
COPY public.users (id, name, email, "emailVerified", image) FROM stdin;
\.
COPY public.verification_tokens (token, identifier, expires) FROM stdin;
\.
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.reservation_status_enum
    ADD CONSTRAINT reservation_status_enum_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.verification_tokens
    ADD CONSTRAINT verification_tokens_pkey PRIMARY KEY (token);
CREATE TRIGGER restaurant_slug_insert BEFORE INSERT ON public.restaurant FOR EACH ROW WHEN (((new.name IS NOT NULL) AND (new.slug IS NULL))) EXECUTE FUNCTION public.set_slug_from_name();
CREATE TRIGGER set_public_reservation_updated_at BEFORE UPDATE ON public.reservation FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_reservation_updated_at ON public.reservation IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_restaurant_updated_at BEFORE UPDATE ON public.restaurant FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_restaurant_updated_at ON public.restaurant IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id);
ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_status_fkey FOREIGN KEY (status) REFERENCES public.reservation_status_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
