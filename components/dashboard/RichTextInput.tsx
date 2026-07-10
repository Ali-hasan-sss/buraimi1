"use client";

import { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
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
    Heading2,
    Heading3,
    Undo,
    Redo,
    RemoveFormatting,
} from "lucide-react";

type Props = {
    name: string;
    defaultValue?: string;
    placeholder?: string;
};

export default function RichTextInput({ name, defaultValue = "", placeholder = "Start writing..." }: Props) {
    const [html, setHtml] = useState(defaultValue);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [2, 3] } }),
            Underline,
            LinkExtension.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
            }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder }),
        ],
        content: defaultValue,
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none min-h-[200px] p-4 outline-none focus:outline-none",
            },
        },
        immediatelyRender: false,
        onUpdate: ({ editor: e }) => {
            setHtml(e.getHTML());
        },
    });

    // Initial HTML is set via useState default; onUpdate handles subsequent changes.

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

    if (!editor) return null;

    return (
        <div className="space-y-2">
            <input type="hidden" name={name} value={html} />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-border bg-muted/40 p-1.5">
                <Btn icon={<Undo className="size-3.5" />} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo" />
                <Btn icon={<Redo className="size-3.5" />} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo" />
                <Sep />
                <Btn icon={<Heading2 className="size-3.5" />} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2" />
                <Btn icon={<Heading3 className="size-3.5" />} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3" />
                <Sep />
                <Btn icon={<Bold className="size-3.5" />} onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold" />
                <Btn icon={<Italic className="size-3.5" />} onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic" />
                <Btn icon={<UnderlineIcon className="size-3.5" />} onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline" />
                <Btn icon={<Strikethrough className="size-3.5" />} onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough" />
                <Sep />
                <Btn icon={<List className="size-3.5" />} onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List" />
                <Btn icon={<ListOrdered className="size-3.5" />} onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List" />
                <Sep />
                <Btn icon={<AlignLeft className="size-3.5" />} onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left" />
                <Btn icon={<AlignCenter className="size-3.5" />} onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center" />
                <Btn icon={<AlignRight className="size-3.5" />} onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right" />
                <Sep />
                <Btn icon={<LinkIcon className="size-3.5" />} onClick={setLink} active={editor.isActive("link")} title="Add Link" />
                <Btn icon={<Unlink className="size-3.5" />} onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive("link")} title="Remove Link" />
                <Sep />
                <Btn icon={<RemoveFormatting className="size-3.5" />} onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting" />
            </div>

            {/* Editor */}
            <div className="rounded-b-md border border-t-0 border-border bg-background">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

function Btn({ icon, onClick, active, disabled, title }: { icon: React.ReactNode; onClick: () => void; active?: boolean; disabled?: boolean; title?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`inline-flex items-center justify-center rounded p-1.5 text-sm transition-colors
                ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
                ${disabled ? "pointer-events-none opacity-40" : ""}
            `}
        >
            {icon}
        </button>
    );
}

function Sep() {
    return <div className="mx-0.5 h-5 w-px bg-border" />;
}
