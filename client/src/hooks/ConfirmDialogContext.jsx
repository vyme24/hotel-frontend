import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDialogContext = createContext({
  confirm: async () => false,
});

export const useConfirmDialog = () => useContext(ConfirmDialogContext);

export function ConfirmDialogProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  const closeDialog = useCallback((result) => {
    if (dialog?.resolve) {
      dialog.resolve(result);
    }
    setDialog(null);
  }, [dialog]);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setDialog({
        title: options?.title || "Are you sure?",
        message: options?.message || "Please confirm to continue.",
        confirmText: options?.confirmText || "Confirm",
        cancelText: options?.cancelText || "Cancel",
        tone: options?.tone || "default",
        resolve,
      });
    });
  }, []);

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}

      {dialog && (
        <div className="fixed inset-0 z-[2300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => closeDialog(false)}
          />

          <div className="relative z-[2301] w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${dialog.tone === "danger" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-900">{dialog.title}</div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Confirmation</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => closeDialog(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 py-5 text-sm leading-7 text-slate-500">
              {dialog.message}
            </div>

            <div className="flex gap-3 px-5 pb-5">
              <button
                type="button"
                onClick={() => closeDialog(false)}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                {dialog.cancelText}
              </button>
              <button
                type="button"
                onClick={() => closeDialog(true)}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-bold text-white transition ${
                  dialog.tone === "danger"
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                }`}
              >
                {dialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmDialogContext.Provider>
  );
}
