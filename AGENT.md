# 🤖 AFAQCM Agent Guide

Welcome to the **AFAQCM Assessment Platform**.

This guide is intended for **assessment agents** who are responsible for managing company assessments, sending quotations, and ensuring that clients are guided through the evaluation journey using professional standards like the "الرباعية العبدلية" framework.

---

## 🧱 System Overview

- **Backend:** Laravel 12
- **Admin Panel:** FilamentPHP 3.2
- **Frontend:** React + TypeScript (via Inertia.js)

AFAQCM allows companies to assess departments using industry-standard tools built around defined **domains**, **categories**, and **criteria**. One such example is the **Abdulliya Quadrant** (`الرباعية العبدلية`), used to evaluate marketing readiness.

---

## 🧑‍💻 Your Role as Agent

Agents are responsible for:

- Monitoring incoming **assessment requests**
- Communicating with requesting companies
- Sending tailored **tool quotations**
- Assisting with onboarding companies to use the assessment tools
- Following up with free and premium users

---

## 🔍 Understanding the Tool Structure

Each tool consists of:

1. **Domain** (e.g., Structure, Process, Innovation & Tech, Impact)
2. **Categories** under each domain (e.g., Team Structure, Strategic Planning)
3. **Criteria** that users evaluate or are evaluated against

All of these are created and managed from the **Filament Admin Panel**.

---

## 🧾 Handling a New Request

1. Go to the **Filament Admin Panel**
2. Navigate to:  
   `Tool Requests → View`
3. Review user details:
    - Tool requested
    - Company name and contact info
    - User type: Free or Premium

---

## 📬 Sending a Quotation

If the user is not yet Premium:

1. Prepare a quotation with course/tool price and duration.
2. Use the `SendToolQuotation` feature to generate and email a quote.
3. Update the tool request status to `Quoted`.

Make sure to:
- Personalize the message
- Attach any helpful documents (PDFs, brochures, etc.)

---

## 🛠 Using the Assessment Tool

Users (free or premium) complete assessments directly on the **React frontend**.

You can:
- View user progress in the admin panel
- See which tool, domain, and category they’re interacting with
- Generate a **readiness report** if needed

---

## 📌 Tips for Agents

- Understand the assessment framework used in each tool (e.g., `الرباعية العبدلية`)
- Guide clients through tool expectations if needed
- Follow up with leads who requested but haven’t submitted assessments
- Mark tool requests with clear status updates: `Pending`, `Quoted`, `Completed`

---

## 📈 Example: Abdulliya Quadrant Tool (الرباعية العبدلية)

This tool includes 4 domains:
1. **Structure** – team roles, resources, policies
2. **Process** – marketing strategy, execution, data use
3. **Innovation & Tech** – CRM, automation, tech readiness
4. **Impact** – ROI, brand influence, customer satisfaction

Each domain includes weighted criteria and scoring. Results determine if a company is:
- **Beginner**
- **Intermediate**
- **Mature**

---

## 📞 Need Help?

- Platform issues? → `support@afaqcm.com`
- Quotation questions? → Contact the administrator
- PDF references → See attached SADARAH-OMI-011 for tool criteria

---

**Thank you for representing AFAQCM professionally and helping clients improve through structured assessments.**
