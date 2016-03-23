--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-03-23 06:11:03 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12361)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2216 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 198 (class 1259 OID 22938)
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
-- TOC entry 197 (class 1259 OID 22936)
-- Name: Sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Sessions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2217 (class 0 OID 0)
-- Dependencies: 197
-- Name: Sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Sessions_id_seq" OWNED BY "Sessions".id;


--
-- TOC entry 196 (class 1259 OID 22927)
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
-- TOC entry 195 (class 1259 OID 22925)
-- Name: Things__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Things__id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2218 (class 0 OID 0)
-- Dependencies: 195
-- Name: Things__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Things__id_seq" OWNED BY "Things"._id;


--
-- TOC entry 192 (class 1259 OID 22890)
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
-- TOC entry 191 (class 1259 OID 22888)
-- Name: claim_documents__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE claim_documents__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2219 (class 0 OID 0)
-- Dependencies: 191
-- Name: claim_documents__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE claim_documents__id_seq OWNED BY claim_documents._id;


--
-- TOC entry 194 (class 1259 OID 22911)
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
-- TOC entry 193 (class 1259 OID 22909)
-- Name: claim_tasks__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE claim_tasks__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2220 (class 0 OID 0)
-- Dependencies: 193
-- Name: claim_tasks__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE claim_tasks__id_seq OWNED BY claim_tasks._id;


--
-- TOC entry 190 (class 1259 OID 22874)
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
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    policy__id integer
);


--
-- TOC entry 189 (class 1259 OID 22872)
-- Name: claims__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE claims__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2221 (class 0 OID 0)
-- Dependencies: 189
-- Name: claims__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE claims__id_seq OWNED BY claims._id;


--
-- TOC entry 184 (class 1259 OID 22831)
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE customers (
    _id integer NOT NULL,
    name character varying(255),
    info character varying(255),
    active boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- TOC entry 183 (class 1259 OID 22829)
-- Name: customers__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE customers__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2222 (class 0 OID 0)
-- Dependencies: 183
-- Name: customers__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE customers__id_seq OWNED BY customers._id;


--
-- TOC entry 182 (class 1259 OID 22821)
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
-- TOC entry 181 (class 1259 OID 22819)
-- Name: documentypes__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE documentypes__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2223 (class 0 OID 0)
-- Dependencies: 181
-- Name: documentypes__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE documentypes__id_seq OWNED BY documentypes._id;


--
-- TOC entry 186 (class 1259 OID 22842)
-- Name: policies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE policies (
    _id integer NOT NULL,
    reference character varying(255),
    amount double precision,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    active boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    customer__id integer
);


--
-- TOC entry 185 (class 1259 OID 22840)
-- Name: policies__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE policies__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2224 (class 0 OID 0)
-- Dependencies: 185
-- Name: policies__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE policies__id_seq OWNED BY policies._id;


--
-- TOC entry 188 (class 1259 OID 22855)
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
-- TOC entry 187 (class 1259 OID 22853)
-- Name: users__id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2225 (class 0 OID 0)
-- Dependencies: 187
-- Name: users__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users__id_seq OWNED BY users._id;


--
-- TOC entry 2049 (class 2604 OID 22941)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Sessions" ALTER COLUMN id SET DEFAULT nextval('"Sessions_id_seq"'::regclass);


--
-- TOC entry 2048 (class 2604 OID 22930)
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Things" ALTER COLUMN _id SET DEFAULT nextval('"Things__id_seq"'::regclass);


--
-- TOC entry 2046 (class 2604 OID 22893)
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_documents ALTER COLUMN _id SET DEFAULT nextval('claim_documents__id_seq'::regclass);


--
-- TOC entry 2047 (class 2604 OID 22914)
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_tasks ALTER COLUMN _id SET DEFAULT nextval('claim_tasks__id_seq'::regclass);


--
-- TOC entry 2045 (class 2604 OID 22877)
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY claims ALTER COLUMN _id SET DEFAULT nextval('claims__id_seq'::regclass);


--
-- TOC entry 2041 (class 2604 OID 22834)
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY customers ALTER COLUMN _id SET DEFAULT nextval('customers__id_seq'::regclass);


--
-- TOC entry 2040 (class 2604 OID 22824)
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY documentypes ALTER COLUMN _id SET DEFAULT nextval('documentypes__id_seq'::regclass);


--
-- TOC entry 2042 (class 2604 OID 22845)
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY policies ALTER COLUMN _id SET DEFAULT nextval('policies__id_seq'::regclass);


--
-- TOC entry 2043 (class 2604 OID 22858)
-- Name: _id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN _id SET DEFAULT nextval('users__id_seq'::regclass);


--
-- TOC entry 2209 (class 0 OID 22938)
-- Dependencies: 198
-- Data for Name: Sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "Sessions" (id, sid, data, "createdAt", "updatedAt") FROM stdin;
1	lDZdi-KjNLVKfCFYk3zaAOVZ9xOFUiLk	{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}	2016-03-23 10:07:42.237+00	2016-03-23 10:07:42.237+00
\.


--
-- TOC entry 2226 (class 0 OID 0)
-- Dependencies: 197
-- Name: Sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Sessions_id_seq"', 1, true);


--
-- TOC entry 2207 (class 0 OID 22927)
-- Dependencies: 196
-- Data for Name: Things; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "Things" (_id, name, info, active, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 2227 (class 0 OID 0)
-- Dependencies: 195
-- Name: Things__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Things__id_seq"', 1, false);


--
-- TOC entry 2203 (class 0 OID 22890)
-- Dependencies: 192
-- Data for Name: claim_documents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY claim_documents (_id, info, url, active, created_at, updated_at, claim__id, documentype__id) FROM stdin;
\.


--
-- TOC entry 2228 (class 0 OID 0)
-- Dependencies: 191
-- Name: claim_documents__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('claim_documents__id_seq', 1, false);


--
-- TOC entry 2205 (class 0 OID 22911)
-- Dependencies: 194
-- Data for Name: claim_tasks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY claim_tasks (_id, description, content, active, created_at, updated_at, claim__id) FROM stdin;
\.


--
-- TOC entry 2229 (class 0 OID 0)
-- Dependencies: 193
-- Name: claim_tasks__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('claim_tasks__id_seq', 1, false);


--
-- TOC entry 2201 (class 0 OID 22874)
-- Dependencies: 190
-- Data for Name: claims; Type: TABLE DATA; Schema: public; Owner: -
--

COPY claims (_id, description, date_incident, date_reported, status, info, active, created_at, updated_at, policy__id) FROM stdin;
\.


--
-- TOC entry 2230 (class 0 OID 0)
-- Dependencies: 189
-- Name: claims__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('claims__id_seq', 1, false);


--
-- TOC entry 2195 (class 0 OID 22831)
-- Dependencies: 184
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY customers (_id, name, info, active, created_at, updated_at) FROM stdin;
1	Acme Inc	\N	t	2016-03-23 10:07:40.523+00	2016-03-23 10:07:40.523+00
\.


--
-- TOC entry 2231 (class 0 OID 0)
-- Dependencies: 183
-- Name: customers__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('customers__id_seq', 1, true);


--
-- TOC entry 2193 (class 0 OID 22821)
-- Dependencies: 182
-- Data for Name: documentypes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY documentypes (_id, name, active, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 2232 (class 0 OID 0)
-- Dependencies: 181
-- Name: documentypes__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('documentypes__id_seq', 1, false);


--
-- TOC entry 2197 (class 0 OID 22842)
-- Dependencies: 186
-- Data for Name: policies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY policies (_id, reference, amount, start_date, end_date, active, created_at, updated_at, customer__id) FROM stdin;
1	001	500000	2016-03-16 10:07:40.629+00	2017-02-23 11:07:40.631+00	t	2016-03-23 10:07:40.632+00	2016-03-23 10:07:40.67+00	1
\.


--
-- TOC entry 2233 (class 0 OID 0)
-- Dependencies: 185
-- Name: policies__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('policies__id_seq', 1, true);


--
-- TOC entry 2199 (class 0 OID 22855)
-- Dependencies: 188
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (_id, name, email, role, password, provider, salt, created_at, updated_at, customer__id) FROM stdin;
1	Admin	admin@example.com	admin	nD869Ek5/Psm3YrZGEIvzzEaODmQCrnYuVW+wA/mH6uwRZ3mn+dzKcNw79kYxxyMyRraKxbN6ZwdpKRHvAI8PA==	local	KNX32IUp44n0JluRzt115Q==	2016-03-23 10:07:40.605+00	2016-03-23 10:07:40.707+00	1
\.


--
-- TOC entry 2234 (class 0 OID 0)
-- Dependencies: 187
-- Name: users__id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users__id_seq', 1, true);


--
-- TOC entry 2069 (class 2606 OID 22946)
-- Name: Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2071 (class 2606 OID 22948)
-- Name: Sessions_sid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Sessions"
    ADD CONSTRAINT "Sessions_sid_key" UNIQUE (sid);


--
-- TOC entry 2067 (class 2606 OID 22935)
-- Name: Things_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Things"
    ADD CONSTRAINT "Things_pkey" PRIMARY KEY (_id);


--
-- TOC entry 2063 (class 2606 OID 22898)
-- Name: claim_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_pkey PRIMARY KEY (_id);


--
-- TOC entry 2065 (class 2606 OID 22919)
-- Name: claim_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_tasks
    ADD CONSTRAINT claim_tasks_pkey PRIMARY KEY (_id);


--
-- TOC entry 2061 (class 2606 OID 22882)
-- Name: claims_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_pkey PRIMARY KEY (_id);


--
-- TOC entry 2053 (class 2606 OID 22839)
-- Name: customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (_id);


--
-- TOC entry 2051 (class 2606 OID 22826)
-- Name: documentypes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY documentypes
    ADD CONSTRAINT documentypes_pkey PRIMARY KEY (_id);


--
-- TOC entry 2055 (class 2606 OID 22847)
-- Name: policies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY policies
    ADD CONSTRAINT policies_pkey PRIMARY KEY (_id);


--
-- TOC entry 2057 (class 2606 OID 22866)
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2059 (class 2606 OID 22864)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


--
-- TOC entry 2075 (class 2606 OID 22899)
-- Name: claim_documents_claim__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_claim__id_fkey FOREIGN KEY (claim__id) REFERENCES claims(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2076 (class 2606 OID 22904)
-- Name: claim_documents_documentype__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_documents
    ADD CONSTRAINT claim_documents_documentype__id_fkey FOREIGN KEY (documentype__id) REFERENCES documentypes(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2077 (class 2606 OID 22920)
-- Name: claim_tasks_claim__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim_tasks
    ADD CONSTRAINT claim_tasks_claim__id_fkey FOREIGN KEY (claim__id) REFERENCES claims(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2074 (class 2606 OID 22883)
-- Name: claims_policy__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_policy__id_fkey FOREIGN KEY (policy__id) REFERENCES policies(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2072 (class 2606 OID 22848)
-- Name: policies_customer__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY policies
    ADD CONSTRAINT policies_customer__id_fkey FOREIGN KEY (customer__id) REFERENCES customers(_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2073 (class 2606 OID 22867)
-- Name: users_customer__id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_customer__id_fkey FOREIGN KEY (customer__id) REFERENCES customers(_id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2016-03-23 06:11:08 EDT

--
-- PostgreSQL database dump complete
--

