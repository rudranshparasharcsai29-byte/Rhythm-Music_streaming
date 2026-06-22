import { Pressable, Text, View } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
};

export function SectionHeader({ title, subtitle, actionLabel }: Props) {
  return (
    <View className="flex-row items-end justify-between px-5 pb-3">
      <View className="flex-1 pr-3">
        <Text className="text-[21px] font-extrabold text-text">{title}</Text>
        {subtitle ? <Text className="mt-1 text-[12px] leading-[17px] text-muted">{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable>
          <Text className="text-[12px] font-extrabold text-[#7D5A66]">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
