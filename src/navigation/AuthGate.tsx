// import { Redirect, useSegments } from 'expo-router';
// import { type PropsWithChildren } from 'react';

// import { LoadingSpinner } from '@/components';
// import { useAppSelector } from '@/store/hooks';

// export const AuthGate = ({ children }: PropsWithChildren) => {
//   const segments = useSegments() as string[];
//   const isAuthRoute = segments[0] === '(auth)';
//   const isOtpRoute = segments[1] === 'otp';
//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

//   if (isAuthenticated && isAuthRoute && !isOtpRoute) {
//     return <Redirect href="/home" />;
//   }

//   const isTabRoute = segments[0] === '(tabs)';
// if (!isAuthenticated && !isAuthRoute && !isTabRoute) {
// return <Redirect href="/home" />;
// }

//   if (segments.length === 0) {
//     return <LoadingSpinner />;
//   }

//   return children;
// };

import { Redirect, useSegments } from "expo-router";
import { PropsWithChildren } from "react";

import { useAppSelector } from "@/store/hooks";

export const AuthGate = ({ children }: PropsWithChildren) => {
  const segments = useSegments();
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const inAuthGroup = segments[0] === "(auth)";
  const inTabsGroup = segments[0] === "(tabs)";

  console.log({
    segments,
    isAuthenticated,
  });

  if (isAuthenticated && inAuthGroup) {
    return <Redirect href="/(tabs)/home" />;
  }

  if (!isAuthenticated && inTabsGroup) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
};