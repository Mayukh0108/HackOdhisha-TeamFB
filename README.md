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

```

## 🎬 Live Prediction Instances  

Our system predicts document authenticity in a **smooth, user-friendly way** directly from the live website.  

There are **3 possible outcomes**:  

1. 🟥 **Fake Document Detected**  
   The system flags manipulated or tampered documents.  
   - *Example Screenshot:*
     
    ![WhatsApp Image 2025-09-08 at 00 15 45_01e3e89b](https://github.com/user-attachments/assets/43dcdc10-600c-4fb6-a23a-686291d693d0)
 

2. 🟩 **Original Document Detected**  
   The system verifies and validates genuine documents.  
   - *Example Screenshot:*
      
![WhatsApp Image 2025-09-08 at 00 17 19_c0d96095](https://github.com/user-attachments/assets/909d99f9-be38-4c16-b348-f0d8d92b095f)
 
     

3. 🟨 **Invalid Document Format**  
   If the uploaded file is not a valid certificate/document, the system detects and alerts the user.  
   - *Example Screenshot:*  

   ![WhatsApp Image 2025-09-08 at 00 18 08_e5b00c31](https://github.com/user-attachments/assets/8eab1a87-e279-4a0b-9931-33334a274f80)

     



## 🌐 Website Snapshots  

Here are some snapshots of the **AuthenTech web platform**:  

![WhatsApp Image 2025-09-08 at 00 22 12_fdbd73f7](https://github.com/user-attachments/assets/996b3e46-676f-4140-926f-7f23f56e46e4)


![WhatsApp Image 2025-09-08 at 00 23 39_2af45e2a](https://github.com/user-attachments/assets/e6c0f20e-fcdd-434d-8c94-48ab602a0283)


![WhatsApp Image 2025-09-08 at 00 23 39_2af45e2a](https://github.com/user-attachments/assets/250650dc-7680-4715-bed4-76aa4c10b540)


![WhatsApp Image 2025-09-08 at 00 24 24_20af6070](https://github.com/user-attachments/assets/06077d96-7d45-49be-9578-4b94c0128d09)

