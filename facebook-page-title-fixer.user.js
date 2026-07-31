// ==UserScript==
// @name         facebook-page-title-fixer 
// @namespace    https://github.com/NVDATH/facebook-page-title-fixer
// @version      0.6
// @description  Fast & lightweight script to fix missing or slow Facebook page titles using Cover Photo anchoring.
// @author       AI
// @match        https://badge.facebook.com/*
// @match        https://www.facebook.com/*
// @match        https://web.facebook.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // รายชื่อ Label ของระบบที่จะข้ามไป (ไม่เอามาใช้เป็นชื่อเพจ)
    const IGNORED_LABELS = [
        'your profile', 'profile photo', 'view profile cover photo',
        'facebook', 'home', 'menu', 'more', 'notifications', 'messenger',
        'search facebook', 'โปรไฟล์ของคุณ', 'ดูรูปภาพหน้าปกโปรไฟล์'
    ];

    function setFBTitle() {
        // 1. ลองหาจาก <h1> แบบเดิมก่อน
        const h1 = document.querySelector('h1');
        if (h1 && h1.textContent.trim()) {
            document.title = h1.textContent.trim() + ' | Facebook';
            return true;
        }

        // 2. หาตำแหน่ง Cover Photo เพื่อใช้เป็นจุดอ้างอิง (anchor)
        const cover = document.querySelector('[data-imgperflogname="profileCoverPhoto"]') ||
                      document.querySelector('a[aria-label*="cover photo"]');

        // 3. ดึง Candidate ทั้งหมดที่มี aria-label
        const candidates = document.querySelectorAll('svg[role="img"][aria-label], a[role="link"][aria-label]');

        for (const el of candidates) {
            // ถ้าเจอ Cover Photo แล้ว ให้ข้าม Element ทั้งหมดที่อยู่ "ก่อนหน้า" Cover Photo (ข้าม Navbar)
            if (cover && !(cover.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)) {
                continue;
            }

            const label = el.getAttribute('aria-label')?.trim();
            if (!label) continue;

            // ตรวจสอบว่าคำนี้อยู่ในรายการต้องห้ามหรือไม่
            const lowerLabel = label.toLowerCase();
            const isIgnored = IGNORED_LABELS.some(ignored => lowerLabel.includes(ignored));

            if (!isIgnored) {
                document.title = label + ' | Facebook';
                return true; // สำเร็จ! ได้ชื่อเพจ (เช่น WiTcast)
            }
        }

        return false;
    }

    const observer = new MutationObserver((mutations, obs) => {
        if (setFBTitle()) {
            obs.disconnect(); // หยุดทันทีเมื่อเซ็ต Title สำเร็จ
            console.log('Title set & Observer disconnected.');
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    window.addEventListener('load', () => {
        if (setFBTitle()) {
            observer.disconnect();
        }
    });

    setTimeout(() => observer.disconnect(), 10000);
})();