"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    Link as LinkIcon,
    Unlink,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Heading1,
    Heading2,
    Heading3,
    Undo,
    Redo,
    RemoveFormatting,
    Save,
    Eye,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useTranslations } from "next-intl";

const FontSize = Extension.create({
    name: "fontSize",
    addGlobalAttributes() {
        return [
            {
                types: ["textStyle"],
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize?.replace(/['\"]+/g, "") || null,
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) return {};
                            return { style: `font-size: ${attributes.fontSize}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize:
                (fontSize: string) =>
                    ({ chain }) =>
                        chain().setMark("textStyle", { fontSize }).run(),
            unsetFontSize:
                () =>
                    ({ chain }) =>
                        chain().setMark("textStyle", { fontSize: null }).run(),
        };
    },
});

type Props = {
    initialHtml: string;
    initialUpdatedAt: string;
};

export default function RichTextEditorComp({ initialHtml, initialUpdatedAt }: Props) {
    const [lastSavedAt, setLastSavedAt] = useState<string>(initialUpdatedAt ?? "");
    const [isPending, startTransition] = useTransition();
    const [, forceRerender] = useState(0);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fontSizePx, setFontSizePx] = useState<number>(16);

    const tError = useTranslations("error")
    const tSuccess = useTranslations("success")

    const lastUpdatedLabel = useMemo(() => {
        if (!lastSavedAt) return "";
        const d = new Date(lastSavedAt);
        return !Number.isNaN(d.getTime()) ? d.toLocaleString() : lastSavedAt;
    }, [lastSavedAt]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            TextStyle,
            Color,
            FontSize,
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
            }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: "Start writing the privacy policy…" }),
        ],
        content: initialHtml ?? "",
        editorProps: {
            attributes: {
                class: "tiptap-editor prose prose-zinc max-w-none dark:prose-invert min-h-[500px] p-4 outline-none focus:outline-none",
            },
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (!editor) return;

        const onUpdate = () => {
            forceRerender((x) => x + 1);

            const attr = editor.getAttributes("textStyle") as { fontSize?: unknown };
            const current = typeof attr.fontSize === "string" ? attr.fontSize : "";
            const parsed = current.endsWith("px") ? Number(current.replace("px", "")) : Number.NaN;
            if (Number.isFinite(parsed) && parsed > 0) setFontSizePx(parsed);
        };

        editor.on("transaction", onUpdate);
        editor.on("selectionUpdate", onUpdate);

        return () => {
            editor.off("transaction", onUpdate);
            editor.off("selectionUpdate", onUpdate);
        };
    }, [editor]);

    const setLink = useCallback(() => {
        if (!editor) return;
        const prev = editor.getAttributes("link").href as string | undefined;
        const url = window.prompt("Enter URL", prev ?? "https://");
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    const onSave = () => {
        return
    };

    const onPreview = () => {
        if (!editor) return;
        setPreviewOpen(true);
    };

    const applyFontSize = (px: number) => {
        if (!editor) return;
        const safe = Number.isFinite(px) ? Math.min(Math.max(px, 8), 96) : 16;
        editor.chain().focus().setFontSize(`${safe}px`).run();
        setFontSizePx(safe);
    };
    const tRich = useTranslations("richText")
    const t = useTranslations("sidebar")

    if (!editor) return null;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground">{t("privacy")}</h1>
                    <p className="text-sm text-muted-foreground">Last updated: {lastUpdatedLabel}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                        <DialogTrigger asChild>
                            <Button type="button" variant="outline" onClick={onPreview} disabled={isPending} className="gap-2">
                                <Eye className="size-4" />
                                {tRich("preview")}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl border-border bg-background text-foreground">
                            <DialogHeader>
                                <DialogTitle>{tRich("preview")}</DialogTitle>
                            </DialogHeader>
                            <div className="max-h-[70vh] overflow-auto rounded-md border border-border bg-card p-4">
                                <div
                                    className="prose prose-zinc max-w-none dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button type="button" onClick={onSave} disabled={isPending} className="gap-2">
                        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                        {isPending ? "Saving…" : tRich("save")}
                    </Button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-2">
                <ToolbarBtn
                    icon={<Undo className="size-4" />}
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                />
                <ToolbarBtn
                    icon={<Redo className="size-4" />}
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                />

                <Divider />

                <ToolbarBtn
                    icon={<Heading1 className="size-4" />}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive("heading", { level: 1 })}
                    title="Heading 1"
                />
                <ToolbarBtn
                    icon={<Heading2 className="size-4" />}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive("heading", { level: 2 })}
                    title="Heading 2"
                />
                <ToolbarBtn
                    icon={<Heading3 className="size-4" />}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive("heading", { level: 3 })}
                    title="Heading 3"
                />

                <Divider />

                <div className="flex items-center gap-2 px-1">
                    <label className="text-xs text-muted-foreground">{tRich("color")}</label>
                    <input
                        type="color"
                        value={(editor.getAttributes("textStyle") as { color?: string }).color ?? "#000000"}
                        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                        className="h-8 w-10 cursor-pointer rounded border border-border bg-background"
                        aria-label="Text color"
                    />
                </div>

                <div className="flex items-center gap-2 px-1">
                    <label className="text-xs text-muted-foreground">{tRich("size")}</label>
                    <input
                        type="number"
                        min={8}
                        max={96}
                        step={1}
                        value={fontSizePx}
                        onChange={(e) => setFontSizePx(Number(e.target.value))}
                        onBlur={() => applyFontSize(fontSizePx)}
                        className="h-8 w-20 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                        aria-label="Font size in pixels"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => applyFontSize(fontSizePx)}
                        disabled={isPending}
                        className="h-8 px-2"
                    >
                        {tRich("apply")}
                    </Button>
                </div>

                <ToolbarBtn
                    icon={<Bold className="size-4" />}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                    title="Bold"
                />
                <ToolbarBtn
                    icon={<Italic className="size-4" />}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                    title="Italic"
                />
                <ToolbarBtn
                    icon={<UnderlineIcon className="size-4" />}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive("underline")}
                    title="Underline"
                />
                <ToolbarBtn
                    icon={<Strikethrough className="size-4" />}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive("strike")}
                    title="Strikethrough"
                />

                <Divider />

                <ToolbarBtn
                    icon={<List className="size-4" />}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive("bulletList")}
                    title="Bullet List"
                />
                <ToolbarBtn
                    icon={<ListOrdered className="size-4" />}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive("orderedList")}
                    title="Ordered List"
                />

                <Divider />

                <ToolbarBtn
                    icon={<AlignLeft className="size-4" />}
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    active={editor.isActive({ textAlign: "left" })}
                    title="Align Left"
                />
                <ToolbarBtn
                    icon={<AlignCenter className="size-4" />}
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    active={editor.isActive({ textAlign: "center" })}
                    title="Align Center"
                />
                <ToolbarBtn
                    icon={<AlignRight className="size-4" />}
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    active={editor.isActive({ textAlign: "right" })}
                    title="Align Right"
                />

                <Divider />

                <ToolbarBtn
                    icon={<LinkIcon className="size-4" />}
                    onClick={setLink}
                    active={editor.isActive("link")}
                    title="Add Link"
                />
                <ToolbarBtn
                    icon={<Unlink className="size-4" />}
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive("link")}
                    title="Remove Link"
                />

                <Divider />

                <ToolbarBtn
                    icon={<RemoveFormatting className="size-4" />}
                    onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                    title="Clear Formatting"
                />
            </div>

            {/* Editor area */}
            <div className="rounded-lg border border-border bg-background">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

function ToolbarBtn({
    icon,
    onClick,
    active,
    disabled,
    title,
}: {
    icon: React.ReactNode;
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`inline-flex items-center justify-center rounded-md p-2 text-sm transition-colors
                ${active ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/50" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
                ${disabled ? "pointer-events-none opacity-40" : ""}
            `}
        >
            {icon}
        </button>
    );
}

function Divider() {
    return <div className="mx-1 h-6 w-px bg-border" />;
}
