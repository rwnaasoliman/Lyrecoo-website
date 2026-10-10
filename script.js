// ==============================
// إعدادات الموقع
// ==============================

// ضعي هنا رقم واتساب المصنع بدون + أو مسافات
const whatsappNumber = "201277204515";

// الرسالة الأساسية
const baseWhatsappMessage =
    "مرحباً، أريد الاستفسار عن منتجات مصنع أساتيك.";

// إنشاء رابط واتساب
function createWhatsappLink(message) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// أزرار واتساب
const whatsappLink = createWhatsappLink(baseWhatsappMessage);

document.querySelectorAll("#whatsappButton, #floatingWhatsapp").forEach(link => {
    link.href = whatsappLink;
});

// ==============================
// القائمة في الموبايل
// ==============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
    });
});

// ==============================
// Request a Quote
// ==============================

const quoteForm = document.getElementById("quoteForm");

quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const company = document.getElementById("company").value.trim();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value.trim();
    const size = document.getElementById("size").value.trim();
    const color = document.getElementById("color").value.trim();
    const notes = document.getElementById("notes").value.trim();

    const message = `
طلب عرض سعر - مصنع أساتيك

اسم الشركة: ${company}
الاسم: ${name}
الهاتف / واتساب: ${phone}
البريد الإلكتروني: ${email || "غير مذكور"}

المنتج: ${product}
الكمية: ${quantity || "غير محددة"}
المقاس / العرض: ${size || "غير محدد"}
اللون: ${color || "غير محدد"}

ملاحظات:
${notes || "لا توجد ملاحظات إضافية"}
    `.trim();

    window.open(createWhatsappLink(message), "_blank");
});

// ==============================
// أزرار تفاصيل المنتجات
// ==============================

document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.dataset.product;

        document.getElementById("product").value = productName;
        document.getElementById("quote").scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {
            document.getElementById("company").focus();
        }, 700);
    });
});

// ==============================
// Animation عند النزول
// ==============================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => observer.observe(element));

// ==============================
// زر إضافة الفيديو
// ==============================

document.getElementById("videoNotice").addEventListener("click", () => {
    alert(
        "هنا نقدر نضيف فيديو المصنع الحقيقي. ابعتي الفيديو أو رابط YouTube/Google Drive ونركبه داخل الموقع."
    );
});
