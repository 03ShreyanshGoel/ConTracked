const authReducer = (state, action) => {
    console.log(`Action Received: ${action.type}`); // ✅ Track action type received

    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("Updated State after Login:", {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
                isAuthenticated: true,
            });
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
                isAuthenticated: true,
            };
        case "LOGOUT":
            console.log("Updated State after Logout:", {
                ...state,
                user: null,
                token: null,
                role: null,
                isAuthenticated: false,
            });
            return {
                ...state,
                user: null,
                token: null,
                role: null,
                isAuthenticated: false,
            };
        default:
            console.warn("Unhandled Action Type:", action.type); // ✅ Track unhandled actions
            return state;
    }
};

export default authReducer;
