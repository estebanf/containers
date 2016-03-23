--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_customer__id_fkey;
ALTER TABLE ONLY public.policies DROP CONSTRAINT policies_customer__id_fkey;
ALTER TABLE ONLY public.claims DROP CONSTRAINT claims_policy__id_fkey;
ALTER TABLE ONLY public.claim_tasks DROP CONSTRAINT claim_tasks_claim__id_fkey;
ALTER TABLE ONLY public.claim_documents DROP CONSTRAINT claim_documents_documentype__id_fkey;
ALTER TABLE ONLY public.claim_documents DROP CONSTRAINT claim_documents_claim__id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.policies DROP CONSTRAINT policies_pkey;
ALTER TABLE ONLY public.documentypes DROP CONSTRAINT documentypes_pkey;
ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
ALTER TABLE ONLY public.claims DROP CONSTRAINT claims_pkey;
ALTER TABLE ONLY public.claim_tasks DROP CONSTRAINT claim_tasks_pkey;
ALTER TABLE ONLY public.claim_documents DROP CONSTRAINT claim_documents_pkey;
ALTER TABLE ONLY public."Things" DROP CONSTRAINT "Things_pkey";
ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT "Sessions_sid_key";
ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT "Sessions_pkey";
ALTER TABLE public.users ALTER COLUMN _id DROP DEFAULT;
ALTER TABLE public.policies ALTER COLUMN _id DROP DEFAULT;
ALTER TABLE public.documentypes ALTER COLUMN _id DROP DEFAULT;
ALTER TABLE public.customers ALTER COLUMN _id DROP DEFAULT;
ALTER TABLE public.claims ALTER COLUMN _id DROP DEFAULT;
ALTER TABLE public.claim_tasks ALTER COLUMN _id DROP DEFAULT;
ALTER TABLE public.claim_documents ALTER COLUMN _id DROP DEFAULT;
ALTER TABLE public."Things" ALTER COLUMN _id DROP DEFAULT;
ALTER TABLE public."Sessions" ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users__id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.policies__id_seq;
DROP TABLE public.policies;
DROP SEQUENCE public.documentypes__id_seq;
DROP TABLE public.documentypes;
DROP SEQUENCE public.customers__id_seq;
DROP TABLE public.customers;
DROP SEQUENCE public.claims__id_seq;
DROP TABLE public.claims;
DROP SEQUENCE public.claim_tasks__id_seq;
DROP TABLE public.claim_tasks;
DROP SEQUENCE public.claim_documents__id_seq;
DROP TABLE public.claim_documents;
DROP SEQUENCE public."Things__id_seq";
DROP TABLE public."Things";
DROP SEQUENCE public."Sessions_id_seq";
DROP TABLE public."Sessions";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Sessions; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE "Sessions" (
    id integer NOT NULL,
    sid character varying(255) NOT NULL,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Sessions" OWNER TO caseusr;

--
-- Name: Sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE "Sessions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Sessions_id_seq" OWNER TO caseusr;

--
-- Name: Sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE "Sessions_id_seq" OWNED BY "Sessions".id;


--
-- Name: Things; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE "Things" (
    _id integer NOT NULL,
    name character varying(255),
    info character varying(255),
    active boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Things" OWNER TO caseusr;

--
-- Name: Things__id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE "Things__id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Things__id_seq" OWNER TO caseusr;

--
-- Name: Things__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE "Things__id_seq" OWNED BY "Things"._id;


--
-- Name: claim_documents; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE claim_documents (
    _id integer NOT NULL,
    info character varying(255),
    url character varying(255),
    active boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    claim__id integer,
    documentype__id integer
);


ALTER TABLE claim_documents OWNER TO caseusr;

--
-- Name: claim_documents__id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE claim_documents__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE claim_documents__id_seq OWNER TO caseusr;

--
-- Name: claim_documents__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE claim_documents__id_seq OWNED BY claim_documents._id;


--
-- Name: claim_tasks; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE claim_tasks (
    _id integer NOT NULL,
    description character varying(255),
    content character varying(255),
    active boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    claim__id integer
);


ALTER TABLE claim_tasks OWNER TO caseusr;

--
-- Name: claim_tasks__id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE claim_tasks__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE claim_tasks__id_seq OWNER TO caseusr;

--
-- Name: claim_tasks__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE claim_tasks__id_seq OWNED BY claim_tasks._id;


--
-- Name: claims; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE claims (
    _id integer NOT NULL,
    description character varying(255),
    date_incident timestamp with time zone,
    date_reported timestamp with time zone,
    status character varying(255),
    info character varying(255),
    active boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    policy__id integer
);


ALTER TABLE claims OWNER TO caseusr;

--
-- Name: claims__id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE claims__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE claims__id_seq OWNER TO caseusr;

--
-- Name: claims__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE claims__id_seq OWNED BY claims._id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE customers (
    _id integer NOT NULL,
    name character varying(255),
    info character varying(255),
    active boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE customers OWNER TO caseusr;

--
-- Name: customers__id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE customers__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customers__id_seq OWNER TO caseusr;

--
-- Name: customers__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE customers__id_seq OWNED BY customers._id;


--
-- Name: documentypes; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE documentypes (
    _id integer NOT NULL,
    name character varying(255),
    active boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE documentypes OWNER TO caseusr;

--
-- Name: documentypes__id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE documentypes__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE documentypes__id_seq OWNER TO caseusr;

--
-- Name: documentypes__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE documentypes__id_seq OWNED BY documentypes._id;


--
-- Name: policies; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE policies (
    _id integer NOT NULL,
    reference character varying(255),
    amount double precision,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    active boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    customer__id integer
);


ALTER TABLE policies OWNER TO caseusr;

--
-- Name: policies__id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE policies__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE policies__id_seq OWNER TO caseusr;

--
-- Name: policies__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE policies__id_seq OWNED BY policies._id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: caseusr
--

CREATE TABLE users (
    _id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    role character varying(255) DEFAULT 'user'::character varying,
    password character varying(255),
    provider character varying(255),
    salt character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    customer__id integer
);


ALTER TABLE users OWNER TO caseusr;

--
-- Name: users__id_seq; Type: SEQUENCE; Schema: public; Owner: caseusr
--

CREATE SEQUENCE users__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users__id_seq OWNER TO caseusr;

--
-- Name: users__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: caseusr
--

ALTER SEQUENCE users__id_seq OWNED BY users._id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY "Sessions" ALTER COLUMN id SET DEFAULT nextval('"Sessions_id_seq"'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY "Things" ALTER COLUMN _id SET DEFAULT nextval('"Things__id_seq"'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claim_documents ALTER COLUMN _id SET DEFAULT nextval('claim_documents__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claim_tasks ALTER COLUMN _id SET DEFAULT nextval('claim_tasks__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claims ALTER COLUMN _id SET DEFAULT nextval('claims__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY customers ALTER COLUMN _id SET DEFAULT nextval('customers__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY documentypes ALTER COLUMN _id SET DEFAULT nextval('documentypes__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY policies ALTER COLUMN _id SET DEFAULT nextval('policies__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY users ALTER COLUMN _id SET DEFAULT nextval('users__id_seq'::regclass);


--
-- Data for Name: Sessions; Type: TABLE DATA; Schema: public; Owner: caseusr
--

INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (1, 'lDZdi-KjNLVKfCFYk3zaAOVZ9xOFUiLk', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 10:07:42.237+00', '2016-03-23 10:07:42.237+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (2, 'KMdAfuaZaCFqqPDiBiQRSciJYJMxmYly', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 10:38:53.174+00', '2016-03-23 10:38:53.174+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (3, 'MxkwzWKNpg7sUxsqy3R6_v63dMH5aVJE', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 10:40:47.819+00', '2016-03-23 10:40:47.819+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (4, 'CV_J5VuC_dueeduzOKXjAVjuiYCkJ03b', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 10:40:54.172+00', '2016-03-23 10:40:54.172+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (5, 'pzSKbjVo7AZlINb6u5pBpX1AeHZK-kMQ', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 10:44:42.654+00', '2016-03-23 10:44:42.654+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (6, 'UgexZxYgG4x21jh1ynMXk2aafqH7lR3P', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 10:51:21.841+00', '2016-03-23 10:51:21.841+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (7, '48yH-NHHomLqhu831PTKS6WhP7YlF6Gb', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 10:51:22.107+00', '2016-03-23 10:51:22.107+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (8, 'k2HvpbbMYBQ8QSQk59fdmCLPT5Jpss5z', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 10:56:26.123+00', '2016-03-23 10:56:26.123+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (9, 'a0vR5mwQXfEQvv4NerFnCC7xPLtyThSY', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 11:00:11.109+00', '2016-03-23 11:00:11.109+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (10, 'fXFYcpepjLJBV-x6mm7Q1r_-O97m1B9J', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 11:00:11.417+00', '2016-03-23 11:00:11.417+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (11, 'O7Xd4JHpvo25LN4dH1DdWdGoL_jGFj5g', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 11:00:13.249+00', '2016-03-23 11:00:13.249+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (12, 'SN1XqZsoHZSX7GAcUOE1s0V1PrpLmT0Z', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 12:21:27.939+00', '2016-03-23 12:21:27.939+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (13, 'H7v8kPMYFG45cnDy46q3875PlMI9tTps', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 12:22:05.23+00', '2016-03-23 12:22:05.23+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (14, 'Eu-SmyJdsc7VZ3Mku6mUrzn-adb_N6U1', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 12:22:51.478+00', '2016-03-23 12:22:51.478+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (15, '1BT6n2FdD8SbPSzPbyGt5Gg54TRVT1pK', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 12:23:12.047+00', '2016-03-23 12:23:12.047+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (16, 'xgPUSerhB-Mymm2tYgvU-ISt9yaoBeYR', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 13:25:32.617+00', '2016-03-23 13:25:32.617+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (17, 'qKJqDhs5-xWn8rNIg2rD4f5m36irVYGf', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-23 13:31:26.492+00', '2016-03-23 13:31:26.492+00');


--
-- Name: Sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('"Sessions_id_seq"', 17, true);


--
-- Data for Name: Things; Type: TABLE DATA; Schema: public; Owner: caseusr
--



--
-- Name: Things__id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('"Things__id_seq"', 1, false);


--
-- Data for Name: claim_documents; Type: TABLE DATA; Schema: public; Owner: caseusr
--



--
-- Name: claim_documents__id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('claim_documents__id_seq', 1, false);


--
-- Data for Name: claim_tasks; Type: TABLE DATA; Schema: public; Owner: caseusr
--



--
-- Name: claim_tasks__id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('claim_tasks__id_seq', 1, false);


--
-- Data for Name: claims; Type: TABLE DATA; Schema: public; Owner: caseusr
--

INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (1, 'xcsysf', '2016-03-01 00:00:00+00', '2016-03-05 00:00:00+00', 'fsdfesfes', 'efedsfdsf', true, NULL, NULL, 1);


--
-- Name: claims__id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('claims__id_seq', 1, true);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: caseusr
--

INSERT INTO customers (_id, name, info, active, created_at, updated_at) VALUES (1, 'Acme Inc', NULL, true, '2016-03-23 10:07:40.523+00', '2016-03-23 10:07:40.523+00');


--
-- Name: customers__id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('customers__id_seq', 1, true);


--
-- Data for Name: documentypes; Type: TABLE DATA; Schema: public; Owner: caseusr
--



--
-- Name: documentypes__id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('documentypes__id_seq', 1, false);


--
-- Data for Name: policies; Type: TABLE DATA; Schema: public; Owner: caseusr
--

INSERT INTO policies (_id, reference, amount, start_date, end_date, active, created_at, updated_at, customer__id) VALUES (1, '001', 500000, '2016-03-16 10:07:40.629+00', '2017-02-23 11:07:40.631+00', true, '2016-03-23 10:07:40.632+00', '2016-03-23 10:07:40.67+00', 1);
INSERT INTO policies (_id, reference, amount, start_date, end_date, active, created_at, updated_at, customer__id) VALUES (4, 'ssdfsw', 12345, '2016-03-01 00:00:00+00', '2017-03-31 00:00:00+00', true, NULL, NULL, 1);


--
-- Name: policies__id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('policies__id_seq', 4, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: caseusr
--

INSERT INTO users (_id, name, email, role, password, provider, salt, created_at, updated_at, customer__id) VALUES (1, 'Admin', 'admin@example.com', 'admin', 'nD869Ek5/Psm3YrZGEIvzzEaODmQCrnYuVW+wA/mH6uwRZ3mn+dzKcNw79kYxxyMyRraKxbN6ZwdpKRHvAI8PA==', 'local', 'KNX32IUp44n0JluRzt115Q==', '2016-03-23 10:07:40.605+00', '2016-03-23 10:07:40.707+00', 1);


--
-- Name: users__id_seq; Type: SEQUENCE SET; Schema: public; Owner: caseusr
--

SELECT pg_catalog.setval('users__id_seq', 1, true);


--
-- Name: Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY "Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (id);


--
-- Name: Sessions_sid_key; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY "Sessions"
    ADD CONSTRAINT "Sessions_sid_key" UNIQUE (sid);


--
-- Name: Things_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY "Things"
    ADD CONSTRAINT "Things_pkey" PRIMARY KEY (_id);


--
-- Name: claim_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_pkey PRIMARY KEY (_id);


--
-- Name: claim_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claim_tasks
    ADD CONSTRAINT claim_tasks_pkey PRIMARY KEY (_id);


--
-- Name: claims_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_pkey PRIMARY KEY (_id);


--
-- Name: customers_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (_id);


--
-- Name: documentypes_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY documentypes
    ADD CONSTRAINT documentypes_pkey PRIMARY KEY (_id);


--
-- Name: policies_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY policies
    ADD CONSTRAINT policies_pkey PRIMARY KEY (_id);


--
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


--
-- Name: claim_documents_claim__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_claim__id_fkey FOREIGN KEY (claim__id) REFERENCES claims(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: claim_documents_documentype__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_documentype__id_fkey FOREIGN KEY (documentype__id) REFERENCES documentypes(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: claim_tasks_claim__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claim_tasks
    ADD CONSTRAINT claim_tasks_claim__id_fkey FOREIGN KEY (claim__id) REFERENCES claims(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: claims_policy__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_policy__id_fkey FOREIGN KEY (policy__id) REFERENCES policies(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: policies_customer__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY policies
    ADD CONSTRAINT policies_customer__id_fkey FOREIGN KEY (customer__id) REFERENCES customers(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users_customer__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: caseusr
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_customer__id_fkey FOREIGN KEY (customer__id) REFERENCES customers(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

