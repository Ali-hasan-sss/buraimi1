"use client";

import { useCallback, useEffect, useState } from "react";
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
    RemoveFormatting,
} from "lucide-react";

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

type RichTextEditorFieldProps = {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    className?: string;
};

export function RichTextEditorField({ value, onChange, placeholder, className }: RichTextEditorFieldProps) {
    const [, forceRerender] = useState(0);

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
            Placeholder.configure({ placeholder: placeholder ?? "Start writing…" }),
        ],
        content: value ?? "",
        editorProps: {
            attributes: {
                class: "tiptap-editor prose prose-zinc max-w-none dark:prose-invert min-h-[250px] p-4 outline-none focus:outline-none",
            },
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (!editor) return;

        const current = editor.getHTML();
        if (current === value) return;

        editor.commands.setContent(value ?? "");
    }, [editor, value]);

    useEffect(() => {
        if (!editor) return;

        const onUpdate = () => {
            forceRerender((x) => x + 1);
            onChange(editor.getHTML());
        };

        editor.on("transaction", onUpdate);

        return () => {
            editor.off("transaction", onUpdate);
        };
    }, [editor, onChange]);

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
        <div className={className}>
            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-2">
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
