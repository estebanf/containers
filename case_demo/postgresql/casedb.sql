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
DROP INDEX public.ihdsclaimsdocdsdpid;
DROP INDEX public.idxprfclaimdprcdid;
DROP INDEX public.idxprfclaimdpdate;
DROP INDEX public.idxclaimsdocdprcdid;
DROP INDEX public.idxclaimsdocdpdate;
DROP INDEX public.icfsclaimsdocdsdpid;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.prfprfclaim DROP CONSTRAINT prfprfclaim_pkey;
ALTER TABLE ONLY public.prfhdsclaimsdoc DROP CONSTRAINT prfhdsclaimsdoc_pkey;
ALTER TABLE ONLY public.prfclaimsdoc DROP CONSTRAINT prfclaimsdoc_pkey;
ALTER TABLE ONLY public.prfcfsclaimsdoc DROP CONSTRAINT prfcfsclaimsdoc_pkey;
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
ALTER TABLE public.prfprfclaim ALTER COLUMN dpdkey DROP DEFAULT;
ALTER TABLE public.prfhdsclaimsdoc ALTER COLUMN dsdkey DROP DEFAULT;
ALTER TABLE public.prfclaimsdoc ALTER COLUMN dpdkey DROP DEFAULT;
ALTER TABLE public.prfcfsclaimsdoc ALTER COLUMN dsdkey DROP DEFAULT;
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
DROP SEQUENCE public.prfprfclaim_dpdkey_seq;
DROP TABLE public.prfprfclaim;
DROP SEQUENCE public.prfhdsclaimsdoc_dsdkey_seq;
DROP TABLE public.prfhdsclaimsdoc;
DROP SEQUENCE public.prfclaimsdoc_dpdkey_seq;
DROP TABLE public.prfclaimsdoc;
DROP SEQUENCE public.prfcfsclaimsdoc_dsdkey_seq;
DROP TABLE public.prfcfsclaimsdoc;
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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Sessions" (
    id integer NOT NULL,
    sid character varying(255) NOT NULL,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Sessions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Sessions_id_seq" OWNED BY "Sessions".id;


--
-- Name: Things; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Things" (
    _id integer NOT NULL,
    name character varying(255),
    info character varying(255),
    active boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Things__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Things__id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Things__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Things__id_seq" OWNED BY "Things"._id;


--
-- Name: claim_documents; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: claim_documents__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE claim_documents__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: claim_documents__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE claim_documents__id_seq OWNED BY claim_documents._id;


--
-- Name: claim_tasks; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: claim_tasks__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE claim_tasks__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: claim_tasks__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE claim_tasks__id_seq OWNED BY claim_tasks._id;


--
-- Name: claims; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: claims__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE claims__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: claims__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE claims__id_seq OWNED BY claims._id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE customers (
    _id integer NOT NULL,
    name character varying(255),
    info character varying(255),
    active boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: customers__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE customers__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE customers__id_seq OWNED BY customers._id;


--
-- Name: documentypes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE documentypes (
    _id integer NOT NULL,
    name character varying(255),
    active boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- Name: documentypes__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE documentypes__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: documentypes__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE documentypes__id_seq OWNED BY documentypes._id;


--
-- Name: policies; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: policies__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE policies__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: policies__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE policies__id_seq OWNED BY policies._id;


--
-- Name: prfcfsclaimsdoc; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE prfcfsclaimsdoc (
    dsdkey integer NOT NULL,
    dsdpid integer NOT NULL
);


--
-- Name: prfcfsclaimsdoc_dsdkey_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE prfcfsclaimsdoc_dsdkey_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prfcfsclaimsdoc_dsdkey_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE prfcfsclaimsdoc_dsdkey_seq OWNED BY prfcfsclaimsdoc.dsdkey;


--
-- Name: prfclaimsdoc; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE prfclaimsdoc (
    dpdkey integer NOT NULL,
    dpdate character varying(10) NOT NULL,
    dprcdid integer NOT NULL,
    dpcalculateddate character varying(100),
    dpdesireddate character varying(100)
);


--
-- Name: prfclaimsdoc_dpdkey_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE prfclaimsdoc_dpdkey_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prfclaimsdoc_dpdkey_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE prfclaimsdoc_dpdkey_seq OWNED BY prfclaimsdoc.dpdkey;


--
-- Name: prfhdsclaimsdoc; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE prfhdsclaimsdoc (
    dsdkey integer NOT NULL,
    dsdpid integer NOT NULL
);


--
-- Name: prfhdsclaimsdoc_dsdkey_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE prfhdsclaimsdoc_dsdkey_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prfhdsclaimsdoc_dsdkey_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE prfhdsclaimsdoc_dsdkey_seq OWNED BY prfhdsclaimsdoc.dsdkey;


--
-- Name: prfprfclaim; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE prfprfclaim (
    dpdkey integer NOT NULL,
    dpdate character varying(10) NOT NULL,
    dprcdid integer NOT NULL,
    dpcalculateddate character varying(100),
    dpdesireddate character varying(100)
);


--
-- Name: prfprfclaim_dpdkey_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE prfprfclaim_dpdkey_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prfprfclaim_dpdkey_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE prfprfclaim_dpdkey_seq OWNED BY prfprfclaim.dpdkey;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: users__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users__id_seq OWNED BY users._id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Sessions" ALTER COLUMN id SET DEFAULT nextval('"Sessions_id_seq"'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Things" ALTER COLUMN _id SET DEFAULT nextval('"Things__id_seq"'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_documents ALTER COLUMN _id SET DEFAULT nextval('claim_documents__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_tasks ALTER COLUMN _id SET DEFAULT nextval('claim_tasks__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY claims ALTER COLUMN _id SET DEFAULT nextval('claims__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY customers ALTER COLUMN _id SET DEFAULT nextval('customers__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY documentypes ALTER COLUMN _id SET DEFAULT nextval('documentypes__id_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY policies ALTER COLUMN _id SET DEFAULT nextval('policies__id_seq'::regclass);


--
-- Name: dsdkey; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY prfcfsclaimsdoc ALTER COLUMN dsdkey SET DEFAULT nextval('prfcfsclaimsdoc_dsdkey_seq'::regclass);


--
-- Name: dpdkey; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY prfclaimsdoc ALTER COLUMN dpdkey SET DEFAULT nextval('prfclaimsdoc_dpdkey_seq'::regclass);


--
-- Name: dsdkey; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY prfhdsclaimsdoc ALTER COLUMN dsdkey SET DEFAULT nextval('prfhdsclaimsdoc_dsdkey_seq'::regclass);


--
-- Name: dpdkey; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY prfprfclaim ALTER COLUMN dpdkey SET DEFAULT nextval('prfprfclaim_dpdkey_seq'::regclass);


--
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN _id SET DEFAULT nextval('users__id_seq'::regclass);


--
-- Data for Name: Sessions; Type: TABLE DATA; Schema: public; Owner: -
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
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (18, 'FmoBFs_8nbYAfXncdQfxt6kxropfD8TW', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-24 11:59:06.855+00', '2016-03-24 11:59:06.855+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (19, '2YnqBvCeEkGJv9afnYIxFe2y7yeGNN3w', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-24 12:00:29.953+00', '2016-03-24 12:00:29.953+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (20, '6WP9SrNxraOKse2M1Qhwz8weE_S39Dcb', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-24 12:40:25.46+00', '2016-03-24 12:40:25.46+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (21, 'idJP4r_lrXHz6CDAcbJF9z8nHy8h9S89', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-24 12:45:40.786+00', '2016-03-24 12:45:40.786+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (22, 'sV88N1FshVGR4twoMj3iFfSu89DOuyyw', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-24 12:58:11.018+00', '2016-03-24 12:58:11.018+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (23, 'Hn3iJzueXoYQFKGUaYzD7YV42RlSzuVH', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-24 12:58:18.99+00', '2016-03-24 12:58:18.99+00');
INSERT INTO "Sessions" (id, sid, data, "createdAt", "updatedAt") VALUES (24, 'IHdqv882ebfcNzZCMqcWCSQXq-ZFJsdS', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '2016-03-24 13:04:41.991+00', '2016-03-24 13:04:41.991+00');


--
-- Name: Sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Sessions_id_seq"', 24, true);


--
-- Data for Name: Things; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: Things__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Things__id_seq"', 1, false);


--
-- Data for Name: claim_documents; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: claim_documents__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('claim_documents__id_seq', 1, false);


--
-- Data for Name: claim_tasks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: claim_tasks__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('claim_tasks__id_seq', 1, false);


--
-- Data for Name: claims; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (1, 'xcsysf', '2016-03-01 00:00:00+00', '2016-03-05 00:00:00+00', 'fsdfesfes', 'efedsfdsf', true, NULL, NULL, 1);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (2, 'asdad', '2016-03-09 00:00:00+00', '2016-03-30 00:00:00+00', 'asdad', 'asdad', true, NULL, NULL, 5);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (3, 'workflow test 001', '2016-03-01 00:00:00+00', '2016-03-24 00:00:00+00', 'test', 'test', true, NULL, NULL, 1);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (4, 'asd', '2016-03-16 00:00:00+00', '2016-03-29 00:00:00+00', 'asd', 'asdasd', true, NULL, NULL, 5);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (5, 'adfsdf', '2016-03-14 00:00:00+00', '2016-03-30 00:00:00+00', 'sdf', 'sdf', true, NULL, NULL, 4);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (6, 'sdf', '2016-03-15 00:00:00+00', '2016-03-30 00:00:00+00', 'sdfs', 'sdf', true, NULL, NULL, 4);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (7, 'asda', '2016-03-16 00:00:00+00', '2016-03-23 00:00:00+00', 'sdf', 'sdf', true, NULL, NULL, 1);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (8, 'asd', '2016-03-15 00:00:00+00', '2016-03-22 00:00:00+00', 'sdf', 'sdf', true, NULL, NULL, 1);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (9, 'asda', '2016-03-15 00:00:00+00', '2016-03-30 00:00:00+00', 'sfd', 'sdf', true, NULL, NULL, 5);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (10, 'sdf', '2016-03-22 00:00:00+00', '2016-03-23 00:00:00+00', 'sdf', 'sdf', true, NULL, NULL, 1);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (11, 'sdf', '2016-03-08 00:00:00+00', '2016-03-23 00:00:00+00', 'sdf', 'sdf', true, NULL, NULL, 1);
INSERT INTO claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) VALUES (12, 'sdfs', '2016-03-15 00:00:00+00', '2016-03-22 00:00:00+00', 'sdf', 'sdf', true, NULL, NULL, 1);


--
-- Name: claims__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('claims__id_seq', 12, true);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO customers (_id, name, info, active, created_at, updated_at) VALUES (1, 'Acme Inc', NULL, true, '2016-03-23 10:07:40.523+00', '2016-03-23 10:07:40.523+00');


--
-- Name: customers__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('customers__id_seq', 1, true);


--
-- Data for Name: documentypes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: documentypes__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('documentypes__id_seq', 1, false);


--
-- Data for Name: policies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO policies (_id, reference, amount, start_date, end_date, active, created_at, updated_at, customer__id) VALUES (1, '001', 500000, '2016-03-16 10:07:40.629+00', '2017-02-23 11:07:40.631+00', true, '2016-03-23 10:07:40.632+00', '2016-03-23 10:07:40.67+00', 1);
INSERT INTO policies (_id, reference, amount, start_date, end_date, active, created_at, updated_at, customer__id) VALUES (4, 'ssdfsw', 12345, '2016-03-01 00:00:00+00', '2017-03-31 00:00:00+00', true, NULL, NULL, 1);
INSERT INTO policies (_id, reference, amount, start_date, end_date, active, created_at, updated_at, customer__id) VALUES (5, 'asdad', 123, '2016-03-01 00:00:00+00', '2016-03-23 00:00:00+00', true, NULL, NULL, 1);


--
-- Name: policies__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('policies__id_seq', 5, true);


--
-- Data for Name: prfcfsclaimsdoc; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (1, 1);
INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (2, 2);
INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (3, 3);
INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (4, 4);
INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (5, 5);
INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (6, 6);
INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (7, 7);
INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (8, 8);
INSERT INTO prfcfsclaimsdoc (dsdkey, dsdpid) VALUES (9, 9);


--
-- Name: prfcfsclaimsdoc_dsdkey_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('prfcfsclaimsdoc_dsdkey_seq', 9, true);


--
-- Data for Name: prfclaimsdoc; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (1, '20160324', 3, NULL, NULL);
INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (2, '20160324', 4, NULL, NULL);
INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (3, '20160324', 5, NULL, NULL);
INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (4, '20160324', 6, NULL, NULL);
INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (5, '20160324', 8, NULL, NULL);
INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (6, '20160324', 9, NULL, NULL);
INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (7, '20160324', 10, NULL, NULL);
INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (8, '20160324', 11, NULL, NULL);
INSERT INTO prfclaimsdoc (dpdkey, dpdate, dprcdid, dpcalculateddate, dpdesireddate) VALUES (9, '20160324', 12, NULL, NULL);


--
-- Name: prfclaimsdoc_dpdkey_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('prfclaimsdoc_dpdkey_seq', 9, true);


--
-- Data for Name: prfhdsclaimsdoc; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (1, 1);
INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (2, 2);
INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (3, 3);
INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (4, 4);
INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (5, 5);
INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (6, 6);
INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (7, 7);
INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (8, 8);
INSERT INTO prfhdsclaimsdoc (dsdkey, dsdpid) VALUES (9, 9);


--
-- Name: prfhdsclaimsdoc_dsdkey_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('prfhdsclaimsdoc_dsdkey_seq', 9, true);


--
-- Data for Name: prfprfclaim; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: prfprfclaim_dpdkey_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('prfprfclaim_dpdkey_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO users (_id, name, email, role, password, provider, salt, created_at, updated_at, customer__id) VALUES (1, 'Admin', 'admin@example.com', 'admin', 'nD869Ek5/Psm3YrZGEIvzzEaODmQCrnYuVW+wA/mH6uwRZ3mn+dzKcNw79kYxxyMyRraKxbN6ZwdpKRHvAI8PA==', 'local', 'KNX32IUp44n0JluRzt115Q==', '2016-03-23 10:07:40.605+00', '2016-03-23 10:07:40.707+00', 1);


--
-- Name: users__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users__id_seq', 1, true);


--
-- Name: Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (id);


--
-- Name: Sessions_sid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Sessions"
    ADD CONSTRAINT "Sessions_sid_key" UNIQUE (sid);


--
-- Name: Things_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Things"
    ADD CONSTRAINT "Things_pkey" PRIMARY KEY (_id);


--
-- Name: claim_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_pkey PRIMARY KEY (_id);


--
-- Name: claim_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_tasks
    ADD CONSTRAINT claim_tasks_pkey PRIMARY KEY (_id);


--
-- Name: claims_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_pkey PRIMARY KEY (_id);


--
-- Name: customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (_id);


--
-- Name: documentypes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY documentypes
    ADD CONSTRAINT documentypes_pkey PRIMARY KEY (_id);


--
-- Name: policies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY policies
    ADD CONSTRAINT policies_pkey PRIMARY KEY (_id);


--
-- Name: prfcfsclaimsdoc_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY prfcfsclaimsdoc
    ADD CONSTRAINT prfcfsclaimsdoc_pkey PRIMARY KEY (dsdkey);


--
-- Name: prfclaimsdoc_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY prfclaimsdoc
    ADD CONSTRAINT prfclaimsdoc_pkey PRIMARY KEY (dpdkey);


--
-- Name: prfhdsclaimsdoc_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY prfhdsclaimsdoc
    ADD CONSTRAINT prfhdsclaimsdoc_pkey PRIMARY KEY (dsdkey);


--
-- Name: prfprfclaim_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY prfprfclaim
    ADD CONSTRAINT prfprfclaim_pkey PRIMARY KEY (dpdkey);


--
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


--
-- Name: icfsclaimsdocdsdpid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX icfsclaimsdocdsdpid ON prfcfsclaimsdoc USING btree (dsdpid);


--
-- Name: idxclaimsdocdpdate; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idxclaimsdocdpdate ON prfclaimsdoc USING btree (dpdate);


--
-- Name: idxclaimsdocdprcdid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idxclaimsdocdprcdid ON prfclaimsdoc USING btree (dprcdid);


--
-- Name: idxprfclaimdpdate; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idxprfclaimdpdate ON prfprfclaim USING btree (dpdate);


--
-- Name: idxprfclaimdprcdid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idxprfclaimdprcdid ON prfprfclaim USING btree (dprcdid);


--
-- Name: ihdsclaimsdocdsdpid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ihdsclaimsdocdsdpid ON prfhdsclaimsdoc USING btree (dsdpid);


--
-- Name: claim_documents_claim__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_claim__id_fkey FOREIGN KEY (claim__id) REFERENCES claims(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: claim_documents_documentype__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_documentype__id_fkey FOREIGN KEY (documentype__id) REFERENCES documentypes(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: claim_tasks_claim__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_tasks
    ADD CONSTRAINT claim_tasks_claim__id_fkey FOREIGN KEY (claim__id) REFERENCES claims(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: claims_policy__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_policy__id_fkey FOREIGN KEY (policy__id) REFERENCES policies(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: policies_customer__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY policies
    ADD CONSTRAINT policies_customer__id_fkey FOREIGN KEY (customer__id) REFERENCES customers(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users_customer__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_customer__id_fkey FOREIGN KEY (customer__id) REFERENCES customers(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

