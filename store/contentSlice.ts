import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type Partnership = {
    _id: string;
    order: number;
    name: string;
    nameEn: string;
    type: string;
    description: string;
    date: string;
    international: boolean;
    link?: string;
};

type BoardDirector = {
    _id: string;
    name: string;
    role: string;
    image?: string;
};

type Trustee = {
    _id: string;
    name: string;
    role: string;
    image?: string;
};

type MessageParagraph = {
    textEn: string;
    textAr: string;
};

type RoleMessage = {
    positionEn: string;
    positionAr: string;
    nameEn: string;
    nameAr: string;
    image: string;
    paragraphs: MessageParagraph[];
};

type AboutMessages = {
    chairman: RoleMessage;
    dean: RoleMessage;
};

type ContentState = {
    partnerships: {
        items: Partnership[];
        loading: boolean;
        error: string | null;
    };
    boardDirectors: {
        items: BoardDirector[];
        loading: boolean;
        error: string | null;
    };
    boardTrustees: {
        items: Trustee[];
        loading: boolean;
        error: string | null;
    };
    aboutMessages: {
        data: AboutMessages | null;
        loading: boolean;
        error: string | null;
    };
};

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return (await res.json()) as T;
}

export const fetchPartnerships = createAsyncThunk('content/fetchPartnerships', async () => {
    const json = await fetchJson<{ ok: boolean; data?: Partnership[] }>('/api/partnerships');
    if (!json.ok || !Array.isArray(json.data)) throw new Error('Invalid API response');
    return json.data;
});

export const fetchBoardDirectors = createAsyncThunk('content/fetchBoardDirectors', async () => {
    const json = await fetchJson<{ ok: boolean; data?: BoardDirector[] }>('/api/board-directors');
    if (!json.ok || !Array.isArray(json.data)) throw new Error('Invalid API response');
    return json.data;
});

export const fetchBoardTrustees = createAsyncThunk('content/fetchBoardTrustees', async () => {
    const json = await fetchJson<{ ok: boolean; data?: Trustee[] }>('/api/board-trustees');
    if (!json.ok || !Array.isArray(json.data)) throw new Error('Invalid API response');
    return json.data;
});

export const fetchAboutMessages = createAsyncThunk('content/fetchAboutMessages', async () => {
    const json = await fetchJson<{ data?: AboutMessages; error?: string }>('/api/messages');
    if (!json.data) throw new Error(json.error || 'Invalid API response');
    return json.data;
});

const initialState: ContentState = {
    partnerships: { items: [], loading: false, error: null },
    boardDirectors: { items: [], loading: false, error: null },
    boardTrustees: { items: [], loading: false, error: null },
    aboutMessages: { data: null, loading: false, error: null },
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartnerships.pending, (state) => {
                state.partnerships.loading = true;
                state.partnerships.error = null;
            })
            .addCase(fetchPartnerships.fulfilled, (state, action) => {
                state.partnerships.loading = false;
                state.partnerships.items = action.payload;
            })
            .addCase(fetchPartnerships.rejected, (state, action) => {
                state.partnerships.loading = false;
                state.partnerships.error = action.error.message || 'Network error';
            })
            .addCase(fetchBoardDirectors.pending, (state) => {
                state.boardDirectors.loading = true;
                state.boardDirectors.error = null;
            })
            .addCase(fetchBoardDirectors.fulfilled, (state, action) => {
                state.boardDirectors.loading = false;
                state.boardDirectors.items = action.payload;
            })
            .addCase(fetchBoardDirectors.rejected, (state, action) => {
                state.boardDirectors.loading = false;
                state.boardDirectors.error = action.error.message || 'Network error';
            })
            .addCase(fetchBoardTrustees.pending, (state) => {
                state.boardTrustees.loading = true;
                state.boardTrustees.error = null;
            })
            .addCase(fetchBoardTrustees.fulfilled, (state, action) => {
                state.boardTrustees.loading = false;
                state.boardTrustees.items = action.payload;
            })
            .addCase(fetchBoardTrustees.rejected, (state, action) => {
                state.boardTrustees.loading = false;
                state.boardTrustees.error = action.error.message || 'Network error';
            })
            .addCase(fetchAboutMessages.pending, (state) => {
                state.aboutMessages.loading = true;
                state.aboutMessages.error = null;
            })
            .addCase(fetchAboutMessages.fulfilled, (state, action) => {
                state.aboutMessages.loading = false;
                state.aboutMessages.data = action.payload;
            })
            .addCase(fetchAboutMessages.rejected, (state, action) => {
                state.aboutMessages.loading = false;
                state.aboutMessages.error = action.error.message || 'Network error';
            });
    },
});

export default contentSlice.reducer;
