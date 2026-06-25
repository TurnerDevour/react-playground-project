import {createContext} from 'react'

export interface File {
    name: string
    value: string
    language: string
}

export interface Files {
    [key: string]: File
}

export type Theme = 'dark' | 'light'

export interface PlaygroundContext {
    files: Files
    selectedFileName: string
    setSelectedFileName: (fileName: string) => void
    setFiles: (files: Files) => void
    addFile: (fileName: string) => void
    removeFile: (fileName: string) => void
    updateFileName: (oldFieldName: string, newFieldName: string) => void
    theme: Theme,
    setTheme: (theme: Theme) => void
}

export const PlaygroundContext = createContext<PlaygroundContext>({
    selectedFileName: 'App.tsx',
} as PlaygroundContext)