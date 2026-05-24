// import GorhomBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { useMemo, type PropsWithChildren } from 'react';

// import { useAppTheme } from '@/hooks/useAppTheme';

// type Props = PropsWithChildren<{
//   snapPoints?: string[];
// }>;

// export const BottomSheet = ({ children, snapPoints }: Props) => {
//   const theme = useAppTheme();
//   const points = useMemo(() => snapPoints ?? ['24%', '54%'], [snapPoints]);

//   return (
//     <GorhomBottomSheet
//       index={0}
//       snapPoints={points}
//       backgroundStyle={{ backgroundColor: theme.colors.surface }}
//       handleIndicatorStyle={{ backgroundColor: theme.colors.border }}
//     >
//       <BottomSheetView>{children}</BottomSheetView>
//     </GorhomBottomSheet>
//   );
// };
