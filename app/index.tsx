import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Award, Car, MapPin, Shield } from "lucide-react-native";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-black">
      {/* Hero Section */}
      <View className="relative h-[100vh] justify-center items-center">
        <LinearGradient
          colors={["#000000", "#1a1a2e", "#16213e"]}
          className="absolute inset-0"
        />

        {/* Background Image / Illustration */}
        <LinearGradient
          colors={["#0f172a", "#1e2937", "#334155"]}
          className="absolute inset-0"
        />

        <View className="items-center z-10 px-6">
          <Animated.Text
            entering={FadeInDown.delay(200)}
            className="text-6xl font-bold text-white text-center mb-4"
          >
            Derashfffff
          </Animated.Text>

          <Text className="text-3xl text-primary font-semibold text-center mb-6">
            Move Smarter • Travel Safer
          </Text>
          <Text className="text-3xl text-primary font-semibold text-center mb-6">VERSION 12345</Text>

          <Text className="text-lg text-gray-300 text-center max-w-[280px] mb-12">
            Ethiopia's most advanced transport network — rides, routes, delivery
            & more.
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            className="bg-primary w-full py-4 rounded-2xl mb-4 active:opacity-90"
          >
            <Text className="text-black font-semibold text-center text-lg">
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            className="border border-white/50 w-full py-4 rounded-2xl"
          >
            <Text className="text-white font-medium text-center text-lg">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Section */}
      <View className="px-6 pb-12">
        <Text className="text-3xl font-bold text-white mb-8 text-center">
          Why Choose Derash?
        </Text>

        <View className="space-y-8">
          {features.map((feature, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 100)}
              className="bg-zinc-900/70 p-6 rounded-3xl"
            >
              <View className="flex-row items-center gap-4">
                <View className="bg-primary/10 p-4 rounded-2xl">
                  {feature.icon}
                </View>
                <View>
                  <Text className="text-xl font-semibold text-white">
                    {feature.title}
                  </Text>
                  <Text className="text-gray-400 mt-1">{feature.desc}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View className="bg-zinc-950 py-12 px-6">
        <View className="flex-row justify-around">
          {stats.map((stat, i) => (
            <View key={i} className="items-center">
              <Text className="text-4xl font-bold text-primary">
                {stat.value}
              </Text>
              <Text className="text-gray-400 mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Final CTA */}
      <View className="px-6 py-16 bg-gradient-to-b from-transparent to-black">
        <Text className="text-4xl font-bold text-white text-center mb-6">
          Ready to ride with confidence?
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          className="bg-white py-5 rounded-3xl"
        >
          <Text className="text-black text-center font-bold text-xl">
            Join Derash Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const features = [
  {
    icon: <Car color="#00ff9f" size={32} />,
    title: "Instant Rides",
    desc: "Book a ride in seconds with real-time tracking",
  },
  {
    icon: <MapPin color="#00ff9f" size={32} />,
    title: "Smart Routes",
    desc: "Best routes, traffic updates & estimated time",
  },
  {
    icon: <Shield color="#00ff9f" size={32} />,
    title: "Safe & Secure",
    desc: "Verified drivers and emergency SOS feature",
  },
  {
    icon: <Award color="#00ff9f" size={32} />,
    title: "Best Prices",
    desc: "Transparent pricing with no hidden charges",
  },
];

const stats = [
  { value: "50K+", label: "Happy Riders" },
  { value: "1,200", label: "Active Drivers" },
  { value: "98%", label: "Satisfaction Rate" },
];