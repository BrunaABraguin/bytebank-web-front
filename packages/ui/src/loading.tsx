export const Loading = () => {
    return (
        <output
            className="flex flex-col items-center justify-center h-full"
            aria-live="polite"
            aria-label="Carregando"
        >
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green"></div>
            <p>Carregando...</p>
        </output>
    );
};
