// hooks/useUser.ts
import { useCallback, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../reduxHooks";
import {
    getMe,
    updateMe,
    clearUser,
    clearUserError
} from "@/redux/slice/userSlice";
import type { User } from "@/app/types";
import { useToast } from "@/app/hooks/useToast";

export function useUser() {
    const { user, initialUser, loading, error, lastFetched } = useAppSelector(
        (state) => state.user
    );
    
    const { minimalUser } = useAppSelector((state) => state.auth);
    
    const dispatch = useAppDispatch();
    const { addToast } = useToast();

    const lastFetchRef = useRef<number>(lastFetched || 0);

    // Cache duration: 5 minutes
    const CACHE_DURATION = 5 * 60 * 1000;

    const shouldFetchUser = useCallback(() => {
        if (!minimalUser) return false;
        if (!user) return true;
        return Date.now() - lastFetchRef.current > CACHE_DURATION;
    }, [minimalUser, user]);

    // Smart data fetcher with caching
    const getUserData = useCallback(async (forceRefresh = false) => {
        if (!minimalUser) return null;

        if (forceRefresh || shouldFetchUser()) {
            await dispatch(getMe());
            lastFetchRef.current = Date.now();
        }

        return user;
    }, [minimalUser, user, shouldFetchUser, dispatch]);

    // Auto-fetch when authenticated but no user data
    useEffect(() => {
        if (minimalUser && !user) {
            getUserData();
        }
    }, [minimalUser, user, getUserData]);

    // Update ref when lastFetched changes
    useEffect(() => {
        if (lastFetched) {
            lastFetchRef.current = lastFetched;
        }
    }, [lastFetched]);

    return {
        // State
        user,
        loading,
        error,

        // Actions
        getMe: () => dispatch(getMe()),

        updateMe: (updatedData: Partial<User>) => {
            if (!user || !initialUser) return;

            // Check for changes (matching your context logic)
            const hasChanges = Object.keys(updatedData).some((key) => {
                const k = key as keyof User;
                return updatedData[k] !== initialUser?.[k];
            });

            if (!hasChanges) {
                console.log("No changes detected — skipping update.");
                return Promise.resolve({ user: user, skipped: true });
            }

            return dispatch(updateMe(updatedData)).unwrap().then((result) => {
                if (!result.skipped) {
                    addToast({
                        title: "Success",
                        description: "Account successfully updated!",
                    });
                }
                return result;
            });
        },

        clearUser: () => dispatch(clearUser()),
        clearError: () => dispatch(clearUserError()),

        // Additional utilities
        getUserData,
        refreshUserData: () => getUserData(true),

        // Derived state
        isAuthenticated: !!minimalUser,
        hasFullUserData: !!user,
        isLoading: loading || (minimalUser && !user)
    };
}