import { useEffect } from "react";
import { X, Keyboard, BookOpen, Lightbulb } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function HelpModal({ isOpen, onClose }) {
  const user = useAuthStore((s) => s.user);
  const role = user?.role;
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const modifierKey = isMac ? "⌘" : "Ctrl";

  const shortcuts = [
    {
      category: "ناوبری",
      items: [
        {
          keys: [`${modifierKey} + 1`],
          description: "رفتن به داشبورد",
        },
        {
          keys: [`${modifierKey} + 2`],
          description: "رفتن به صفحه فاکتورها",
        },
        {
          keys: [`${modifierKey} + 3`],
          description: "رفتن به صفحه مشتریان",
        },
        ...(role === "ADMIN" || role === "SUPER_ADMIN"
          ? [
              {
                keys: [`${modifierKey} + 4`],
                description: "رفتن به مدیریت کاربران",
              },
            ]
          : []),
        ...(role === "SUPER_ADMIN"
          ? [
              {
                keys: [`${modifierKey} + 5`],
                description: "رفتن به مدیریت ادمین‌ها",
              },
            ]
          : []),
      ],
    },
    {
      category: "عملیات",
      items: [
        {
          keys: [`${modifierKey} + N`],
          description: "افزودن فاکتور جدید (در صفحه فاکتورها) یا مشتری جدید (در صفحه مشتریان)",
        },
        {
          keys: [`${modifierKey} + K`],
          description: "تغییر تم (روشن/تاریک)",
        },
        {
          keys: [`${modifierKey} + ?`],
          description: "باز کردن راهنمای کاربری",
        },
        {
          keys: [`${modifierKey} + H`],
          description: "باز کردن راهنمای کاربری",
        },
      ],
    },
  ];

  const userGuide = [
    {
      title: "شروع کار",
      content: [
        "برای شروع، از منوی کناری به بخش مورد نظر خود بروید.",
        "می‌توانید از کلیدهای میانبر برای ناوبری سریع‌تر استفاده کنید.",
        "برای افزودن فاکتور یا مشتری جدید، از دکمه‌های موجود در بالای هر صفحه استفاده کنید.",
      ],
    },
    {
      title: "مدیریت فاکتورها",
      content: [
        "در صفحه فاکتورها می‌توانید تمام فاکتورهای خود را مشاهده کنید.",
        "برای افزودن فاکتور جدید، روی دکمه 'فاکتور جدید' کلیک کنید یا از کلید میانبر استفاده کنید.",
        "می‌توانید فاکتورها را ویرایش، حذف یا پیش‌نمایش کنید.",
        "از صفحه‌بندی برای مشاهده فاکتورهای بیشتر استفاده کنید.",
      ],
    },
    {
      title: "مدیریت مشتریان",
      content: [
        "در صفحه مشتریان می‌توانید لیست تمام مشتریان خود را ببینید.",
        "برای افزودن مشتری جدید، از دکمه 'مشتری جدید' استفاده کنید.",
        "می‌توانید اطلاعات مشتریان را ویرایش یا حذف کنید.",
        "هر مشتری می‌تواند چندین فاکتور داشته باشد.",
      ],
    },
    {
      title: "نقش‌های کاربری",
      content: [
        "کاربر عادی (USER): می‌تواند فاکتورها و مشتریان خود را مدیریت کند.",
        "مدیر (ADMIN): علاوه بر مدیریت فاکتورها و مشتریان خود، می‌تواند کاربران عادی را مدیریت کند.",
        "سوپر ادمین (SUPER_ADMIN): دسترسی کامل به تمام بخش‌های سیستم از جمله مدیریت ادمین‌ها.",
      ],
    },
    {
      title: "نکات مهم",
      content: [
        "از تاریخ شمسی (جلالی) برای وارد کردن تاریخ‌ها استفاده می‌شود.",
        "تم سیستم به صورت خودکار ذخیره می‌شود و در بازدید بعدی حفظ می‌ماند.",
        "برای خروج از حساب کاربری، از دکمه 'خروج' در بالای صفحه استفاده کنید.",
        "در صورت بروز مشکل، می‌توانید از این راهنما کمک بگیرید.",
      ],
    },
  ];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      id="help_modal"
      className="modal modal-open"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                راهنمای کاربری
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                کلیدهای میانبر و راهنمای استفاده از سیستم
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Keyboard Shortcuts Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Keyboard className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                کلیدهای میانبر
              </h3>
            </div>
            <div className="space-y-6">
              {shortcuts.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {category.category}
                  </h4>
                  <div className="grid gap-3">
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {item.description}
                        </span>
                        <div className="flex items-center gap-2">
                          {item.keys.map((key, keyIdx) => (
                            <div key={keyIdx} className="flex items-center gap-1">
                              {key.split(" + ").map((k, kIdx) => (
                                <kbd
                                  key={kIdx}
                                  className="kbd kbd-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                >
                                  {k}
                                </kbd>
                              ))}
                              {keyIdx < item.keys.length - 1 && (
                                <span className="text-gray-400 mx-1">یا</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* User Guide Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                راهنمای استفاده
              </h3>
            </div>
            <div className="space-y-6">
              {userGuide.map((guide, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-200 dark:border-teal-800"
                >
                  <h4 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-3">
                    {guide.title}
                  </h4>
                  <ul className="space-y-2">
                    {guide.content.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                      >
                        <span className="text-teal-600 dark:text-teal-400 mt-1">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="modal-action mt-6">
          <button onClick={onClose} className="btn btn-primary">
            بستن
          </button>
        </div>
      </div>
    </dialog>
  );
}

