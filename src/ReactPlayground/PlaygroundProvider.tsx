import {type Files, PlaygroundContext, type Theme} from "./PlaygroundContext";
import {type PropsWithChildren, useState} from "react";
import {fileName2Language} from "./utils.ts";
import {initFiles} from "./files.ts";

export const PlaygroundProvider = (props: PropsWithChildren) => {
    const {children} = props
    const [files, setFiles] = useState<Files>(initFiles)
    const [selectedFileName, setSelectedFileName] = useState('App.tsx');
    const [theme, setTheme] = useState<Theme>('dark');

    const addFile = (name: string) => {
        files[name] = {
            name,
            language: fileName2Language(name),
            value: '',
        }
        setFiles({...files})
    }

    const removeFile = (name: string) => {
        delete files[name]
        setFiles({...files})
    }

    const updateFileName = (oldFieldName: string, newFieldName: string) => {
        if (!files[oldFieldName] || newFieldName === undefined || newFieldName === null) return
        const {[oldFieldName]: value, ...rest} = files
        const newFile = {
            [newFieldName]: {
                ...value,
                language: fileName2Language(newFieldName),
                name: newFieldName,
            },
        }
        setFiles({
            ...rest,
            ...newFile,
        })
    }

    return (
        <PlaygroundContext.Provider
            value={{
                files,
                selectedFileName,
                setSelectedFileName,
                setFiles,
                addFile,
                removeFile,
                updateFileName,
                theme,
                setTheme,
            }}
        >
            {children}
        </PlaygroundContext.Provider>
    )
}
