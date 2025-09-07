# 🔐 AuthenTech – AI-Powered Document Verification & Authentication Platform

<img width="1899" height="864" alt="image" src="https://github.com/user-attachments/assets/2748fd75-13e2-441c-94c5-a7d6d18f8a92" />
  

 **Tagline:** *“Trust Made Digital”*  

AuthenTech is an **AI-powered platform** that enables **real-time document verification and authentication**.  
By combining **computer vision (YOLOv8n)** with **OCR (Gemini API)**, AuthenTech detects forgeries, extracts structured data,  
and ensures that every certificate, credential, or official paper can be instantly and reliably validated.  

Built during **HackOdisha 2025**, AuthenTech solves the problem of **fake documents, slow manual verification, and lack of scalable solutions**.  

---

## 🚨 Problem Statement  
- 📄 Increasing number of **fake/forged certificates** in jobs, education, and governance.  
- ⏳ Manual verification is **slow, error-prone, and resource-intensive**.  
- 🚫 No scalable, automated solutions exist for **bulk verification**.  
- ⚠️ Fraudulent activities **erode trust** and cause financial/reputational damage.  

---

## ✅ Our Solution: AuthenTech  
AuthenTech provides a **robust, AI-driven platform** for instant and reliable verification.  

✔ Upload any certificate/document.  
✔ Detect forged/tampered regions using **YOLOv8n**.  
✔ Extract structured details with **Gemini API OCR** (Name, Roll No, Course, CGPA, etc.).  
✔ Get a **clear authenticity status**: ✅ *Original* or ❌ *Fake*.  

---

## 🌟 Key Features & USP  
- 🔒 **AI + OCR Integration** – One platform for detection + extraction.  
- ⚡ **Real-Time Verification** – Instant results with high accuracy.  
- 🌐 **Scalable** – Handles individuals, institutions, and bulk checks.  
- 🎯 **User-Friendly UI** – Simple upload → instant output.  

**MVP Features:**  
1. Upload Document  
2. Detect Forgery  
3. Extract Data  
4. Display Authenticity  

---

## ⚙️ Workflow  

```mermaid
flowchart LR
A[User Uploads Document] --> B[YOLOv8n detects forgery/tampering]  
B --> C[Gemini API extracts structured details]  
C --> D[FastAPI backend processes results]  
D --> E[UI displays result: Original/Fake]  
