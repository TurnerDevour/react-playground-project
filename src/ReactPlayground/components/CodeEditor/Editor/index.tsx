import MonacoEditor, {type OnMount, type EditorProps} from '@monaco-editor/react'
import {createATA} from './ata';
import {editor} from 'monaco-editor'

export interface EditorFile {
    name: string
    value: string
    language: string
}

interface Props {
    file: EditorFile
    onChange?: EditorProps['onChange'],
    theme?: EditorProps['theme'],
    options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {

    const {
        file,
        onChange,
        theme,
        options
    } = props;

    const handleEditorMount: OnMount = async (editor, monaco) => {

        if (theme) {
            monaco.editor.setTheme(theme)
        }

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });

        monaco.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
        })

        const ata = createATA((code, path) => {
            monaco.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
        })

        editor.onDidChangeModelContent(async () => {
            await ata(editor.getValue());
        });

        await ata(editor.getValue());
    }

    return <MonacoEditor
        height={'100%'}
        path={file.name}
        language={file.language}
        theme={theme}
        onMount={handleEditorMount}
        onChange={onChange}
        value={file.value}
        options={
            {
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    verticalScrollbarSize: 0,
                    horizontalScrollbarSize: 0,
                },
                ...options
            }
        }
    />
}
