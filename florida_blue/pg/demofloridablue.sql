--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.15
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-03-22 06:11:04 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 11733)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 1943 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 170 (class 1259 OID 16388)
-- Name: member; Type: TABLE; Schema: public; Owner: bpms
--

CREATE TABLE member (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    sex character(1) NOT NULL,
    age integer NOT NULL,
    diabetes boolean NOT NULL,
    heartattack boolean NOT NULL,
    highbloodpressure boolean NOT NULL
);


ALTER TABLE member OWNER TO bpms;

--
-- TOC entry 169 (class 1259 OID 16386)
-- Name: member_id_seq; Type: SEQUENCE; Schema: public; Owner: bpms
--

CREATE SEQUENCE member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE member_id_seq OWNER TO bpms;

--
-- TOC entry 1944 (class 0 OID 0)
-- Dependencies: 169
-- Name: member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bpms
--

ALTER SEQUENCE member_id_seq OWNED BY member.id;


--
-- TOC entry 172 (class 1259 OID 16396)
-- Name: provider; Type: TABLE; Schema: public; Owner: bpms
--

CREATE TABLE provider (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    phone character varying(20) NOT NULL
);


ALTER TABLE provider OWNER TO bpms;

--
-- TOC entry 171 (class 1259 OID 16394)
-- Name: provider_id_seq; Type: SEQUENCE; Schema: public; Owner: bpms
--

CREATE SEQUENCE provider_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE provider_id_seq OWNER TO bpms;

--
-- TOC entry 1945 (class 0 OID 0)
-- Dependencies: 171
-- Name: provider_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bpms
--

ALTER SEQUENCE provider_id_seq OWNED BY provider.id;


--
-- TOC entry 1820 (class 2604 OID 16391)
-- Name: id; Type: DEFAULT; Schema: public; Owner: bpms
--

ALTER TABLE ONLY member ALTER COLUMN id SET DEFAULT nextval('member_id_seq'::regclass);


--
-- TOC entry 1821 (class 2604 OID 16399)
-- Name: id; Type: DEFAULT; Schema: public; Owner: bpms
--

ALTER TABLE ONLY provider ALTER COLUMN id SET DEFAULT nextval('provider_id_seq'::regclass);


--
-- TOC entry 1933 (class 0 OID 16388)
-- Dependencies: 170
-- Data for Name: member; Type: TABLE DATA; Schema: public; Owner: bpms
--

COPY member (id, name, sex, age, diabetes, heartattack, highbloodpressure) FROM stdin;
4	Esteban	M	40	f	f	f
\.


--
-- TOC entry 1946 (class 0 OID 0)
-- Dependencies: 169
-- Name: member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bpms
--

SELECT pg_catalog.setval('member_id_seq', 4, true);


--
-- TOC entry 1935 (class 0 OID 16396)
-- Dependencies: 172
-- Data for Name: provider; Type: TABLE DATA; Schema: public; Owner: bpms
--

COPY provider (id, name, phone) FROM stdin;
1	Memorial Hospital Jacksonville	9046734321
2	Baptist Medical Center Jacksonville	9041231232
3	Wolfson Children hospital	9045667788
4	Nemours	9045621212
\.


--
-- TOC entry 1947 (class 0 OID 0)
-- Dependencies: 171
-- Name: provider_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bpms
--

SELECT pg_catalog.setval('provider_id_seq', 4, true);


--
-- TOC entry 1823 (class 2606 OID 16393)
-- Name: pk; Type: CONSTRAINT; Schema: public; Owner: bpms
--

ALTER TABLE ONLY member
    ADD CONSTRAINT pk PRIMARY KEY (id);


--
-- TOC entry 1825 (class 2606 OID 16401)
-- Name: pk_provider; Type: CONSTRAINT; Schema: public; Owner: bpms
--

ALTER TABLE ONLY provider
    ADD CONSTRAINT pk_provider PRIMARY KEY (id);


--
-- TOC entry 1942 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-03-22 06:11:10 EDT

--
-- PostgreSQL database dump complete
--

