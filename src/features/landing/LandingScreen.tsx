
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  SlideInRight,
  SlideInLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
  Extrapolate,
  Layout,
} from 'react-native-reanimated';
import {
  Car,
  MapPin,
  Shield,
  Award,
  Clock,
  Zap,
  TrendingUp,
  Star,
  Users,
  Navigation,
  ChevronRight,
  ArrowRight,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function DerashLandingPage() {
  const router = useRouter();
  const scrollY = useSharedValue(0);
  const floatingAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(1);
  const [activeFeature, setActiveFeature] = useState(0);
  const [expandedStat, setExpandedStat] = useState<number | null>(null);

  useEffect(() => {
    floatingAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const heroFloatingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(floatingAnim.value, [0, 1], [0, -20]),
        },
      ],
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnim.value }],
    };
  });

  const headerOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 100],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[
          styles.floatingHeader,
          headerOpacity,
          {
            shadowColor: '#00ff9f',
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 10,
          },
        ]}
      >
        <BlurView intensity={90} tint="dark" style={styles.headerBlur}>
          <View style={styles.headerContent}>
            <Text style={styles.headerLogo}>DERASH</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity>
                <Text style={styles.headerLink}>Ride</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.headerLink}>Deliver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={['#000000', '#0a0a1f', '#1a0f2e', '#0a0a1f']}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={styles.gridBackground} pointerEvents="none">
            {[...Array(15)].map((_, i) => (
              <Animated.View
                key={i}
                entering={FadeIn.delay(i * 40).duration(800)}
                style={[
                  styles.gridLine,
                  { top: (i * height) / 15 },
                  { opacity: 0.08 },
                ]}
              />
            ))}
          </View>

          <Animated.View
            style={[
              styles.glowOrb1,
              pulseStyle,
              {
                shadowColor: '#00ff9f',
                shadowOpacity: 0.5,
                shadowRadius: 30,
                elevation: 20,
              },
            ]}
          >
            <LinearGradient
              colors={['#00ff9f50', '#00ffff20', 'transparent']}
              style={styles.orbGradient}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.glowOrb2,
              pulseStyle,
              {
                shadowColor: '#ff006e',
                shadowOpacity: 0.4,
                shadowRadius: 25,
              },
            ]}
          >
            <LinearGradient
              colors={['#ff006e40', '#ff00ff20', 'transparent']}
              style={styles.orbGradient}
            />
          </Animated.View>

          <Animated.View
            style={[styles.heroContent, heroFloatingStyle]}
            entering={FadeInDown.delay(200).duration(1000).springify()}
          >
            <Animated.View
              entering={SlideInLeft.delay(300).duration(800).springify()}
              style={styles.logoBadge}
            >
              <BlurView intensity={25} tint="dark" style={styles.badgeContainer}>
                <LinearGradient
                  colors={['#00ff9f25', '#00ff9f10']}
                  style={styles.badgeGradient}
                >
                  <View style={styles.badgeIcon}>
                    <Zap color="#00ff9f" size={18} strokeWidth={3} />
                  </View>
                  <Text style={styles.badgeText}>Powered by Orient Tech</Text>
                  <View style={styles.badgeDot} />
                </LinearGradient>
              </BlurView>
            </Animated.View>

            <View style={styles.titleContainer}>
              <Animated.Text
                entering={FadeInDown.delay(400).duration(900).springify()}
                style={styles.heroTitlePart1}
              >
                Move
              </Animated.Text>
              <Animated.View
                entering={FadeIn.delay(500).duration(800)}
                style={styles.highlightBox}
              >
                <LinearGradient
                  colors={['#00ff9f', '#00d4ff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.highlightGradient}
                >
                  <Animated.Text style={styles.heroTitleHighlight}>
                    Smarter
                  </Animated.Text>
                </LinearGradient>
              </Animated.View>
            </View>

            <Animated.Text
              entering={FadeInDown.delay(600).duration(1000)}
              style={styles.heroTitlePart2}
            >
              Travel Safer
            </Animated.Text>

            <Animated.View
              entering={FadeIn.delay(700).duration(1000)}
              style={styles.dividerContainer}
            >
              <LinearGradient
                colors={['transparent', '#00ff9f', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.divider}
              />
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.delay(800).duration(1000)}
              style={styles.heroDescription}
            >
              Ethiopia's most advanced transport network bringing you instant
              rides, smart routes, verified drivers, and secure journeys
            </Animated.Text>

            <Animated.View
              entering={FadeInUp.delay(900).duration(1000).springify()}
              style={styles.ctaContainer}
            >
              <AnimatedTouchable
                onPress={() => router.push('/(auth)/login')}
                style={styles.primaryButtonWrapper}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#00ff9f', '#00d4ff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.primaryButtonGradient}
                >
                  <Text style={styles.primaryButtonText}>Get Started Now</Text>
                  <ArrowRight color="#000" size={22} strokeWidth={2.5} />
                </LinearGradient>
              </AnimatedTouchable>

              <AnimatedTouchable
                onPress={() => router.push('/(auth)/signup')}
                style={styles.secondaryButtonWrapper}
              >
                <View style={styles.secondaryButtonContent}>
                  <Text style={styles.secondaryButtonText}>Create Account</Text>
                  <ChevronRight color="#ffffff" size={20} />
                </View>
              </AnimatedTouchable>
            </Animated.View>
          </Animated.View>

          <Animated.View
            entering={SlideInRight.delay(1100).duration(1000).springify()}
            style={styles.infoCard1}
          >
            <BlurView intensity={35} tint="dark" style={styles.infoCardBlur}>
              <View style={styles.infoCardContent}>
                <View style={styles.infoIconWrapper}>
                  <Users color="#00ff9f" size={24} />
                </View>
                <View>
                  <Text style={styles.infoCardTitle}>50K+</Text>
                  <Text style={styles.infoCardSubtitle}>Active Users</Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View
            entering={SlideInRight.delay(1200).duration(1000).springify()}
            style={styles.infoCard2}
          >
            <BlurView intensity={35} tint="dark" style={styles.infoCardBlur}>
              <View style={styles.infoCardContent}>
                <View style={styles.infoIconWrapper}>
                  <Star color="#ffbe0b" size={24} fill="#ffbe0b" />
                </View>
                <View>
                  <Text style={styles.infoCardTitle}>4.9★</Text>
                  <Text style={styles.infoCardSubtitle}>Rating</Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </View>

        {/* FEATURES SECTION */}
        <View style={styles.featuresSection}>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(800)}
            style={styles.sectionTitle}
          >
            Why Choose Derash?
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(300).duration(800)}
            style={styles.sectionSubtitle}
          >
            Experience the next generation of transportation
          </Animated.Text>

          <View style={styles.featuresContainer}>
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                index={index}
                isActive={activeFeature === index}
                onPress={() => setActiveFeature(index)}
              />
            ))}
          </View>

          {FEATURES[activeFeature] && (
            <Animated.View
              layout={Layout.springify()}
              style={styles.featureDetailsCard}
              entering={FadeIn.duration(500)}
            >
              <BlurView intensity={20} tint="dark" style={styles.detailsBlur}>
                <View style={styles.detailsContent}>
                  <Text style={styles.detailsTitle}>
                    {FEATURES[activeFeature].title}
                  </Text>
                  <Text style={styles.detailsDescription}>
                    {FEATURES[activeFeature].fullDescription}
                  </Text>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Learn More</Text>
                    <ArrowRight color="#00ff9f" size={18} />
                  </TouchableOpacity>
                </View>
              </BlurView>
            </Animated.View>
          )}
        </View>

        {/* STATS SECTION */}
        <View style={styles.statsSection}>
          <LinearGradient
            colors={['#0a0a1f', '#1a0f2e', '#0a0a1f']}
            style={StyleSheet.absoluteFillObject}
          />

          <Animated.Text
            entering={FadeInDown.delay(200).duration(800)}
            style={styles.statsTitle}
          >
            Trusted & Proven
          </Animated.Text>

          <View style={styles.statsGrid}>
            {STATS.map((stat, index) => (
              <StatCard
                key={index}
                stat={stat}
                index={index}
                isExpanded={expandedStat === index}
                onPress={() =>
                  setExpandedStat(expandedStat === index ? null : index)
                }
              />
            ))}
          </View>
        </View>

        {/* HOW IT WORKS SECTION */}
        <View style={styles.howItWorksSection}>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(800)}
            style={styles.sectionTitle}
          >
            How It Works
          </Animated.Text>

          <View style={styles.stepsContainer}>
            {STEPS.map((step, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(300 + index * 150).duration(800)}
                style={styles.stepCard}
              >
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumberContainer}>
                    <LinearGradient
                      colors={['#00ff9f', '#00d4ff']}
                      style={styles.stepNumberGradient}
                    >
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                    </LinearGradient>
                  </View>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                </View>
                <Text style={styles.stepDescription}>{step.description}</Text>

                {index < STEPS.length - 1 && (
                  <View style={styles.stepConnector}>
                    <LinearGradient
                      colors={['#00ff9f50', 'transparent']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.connectorGradient}
                    />
                  </View>
                )}
              </Animated.View>
            ))}
          </View>
        </View>

        {/* TESTIMONIALS SECTION */}
        <View style={styles.testimonialSection}>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(800)}
            style={styles.sectionTitle}
          >
            What Our Users Say
          </Animated.Text>

          <View style={styles.testimonialsContainer}>
            {TESTIMONIALS.map((testimonial, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(300 + index * 100).duration(800)}
                style={styles.testimonialCard}
              >
                <BlurView intensity={20} tint="dark" style={styles.testimonialBlur}>
                  <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        color="#ffbe0b"
                        size={18}
                        fill="#ffbe0b"
                        strokeWidth={1}
                      />
                    ))}
                  </View>
                  <Text style={styles.testimonialText}>
                    "{testimonial.text}"
                  </Text>
                  <Text style={styles.testimonialAuthor}>
                    - {testimonial.author}
                  </Text>
                </BlurView>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* FINAL CTA */}
        <View style={styles.finalCtaSection}>
          <LinearGradient
            colors={['#0a0a1f', '#1a0f2e', '#0a0a1f']}
            style={StyleSheet.absoluteFillObject}
          />

          <Animated.View
            entering={FadeIn.delay(200).duration(1000)}
            style={styles.ctaGlowEffect}
          />

          <Animated.Text
            entering={FadeInDown.delay(300).duration(800)}
            style={styles.ctaMainTitle}
          >
            Ready to Transform Your Commute?
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(400).duration(800)}
            style={styles.ctaSubtitle}
          >
            Join thousands of riders experiencing safer, smarter, faster travel
          </Animated.Text>

          <Animated.View
            entering={FadeInUp.delay(500).duration(800).springify()}
            style={styles.finalCtaButton}
          >
            <AnimatedTouchable
              onPress={() => router.push('/(auth)/signup')}
              style={styles.finalCtaButtonContent}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#00ff9f', '#00d4ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.finalCtaGradient}
              >
                <Text style={styles.finalCtaButtonText}>
                  Download Derash Now
                </Text>
                <Zap color="#000" size={26} fill="#000" strokeWidth={2} />
              </LinearGradient>
            </AnimatedTouchable>
          </Animated.View>

          <Animated.Text
            entering={FadeIn.delay(600).duration(800)}
            style={styles.ctaFooterText}
          >
            • No hidden fees • Cancel anytime • 24/7 Support •
          </Animated.Text>

          <View style={styles.footerLinks}>
            {['Privacy', 'Terms', 'Contact'].map((link, index) => (
              <TouchableOpacity key={index} style={styles.footerLink}>
                <Text style={styles.footerLinkText}>{link}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// FEATURE CARD COMPONENT
const FeatureCard = ({
  feature,
  index,
  isActive,
  onPress,
}: {
  feature: any;
  index: number;
  isActive: boolean;
  onPress: () => void;
}) => {
  const scale = useSharedValue(isActive ? 1.02 : 1);
  const bgOpacity = useSharedValue(isActive ? 1 : 0.6);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1.02 : 1);
    bgOpacity.value = withTiming(isActive ? 1 : 0.6, { duration: 300 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const bgStyle = useAnimatedStyle(() => {
    return {
      opacity: bgOpacity.value,
    };
  });

  return (
    <AnimatedTouchable
      entering={FadeInDown.delay(400 + index * 100).duration(800).springify()}
      onPress={onPress}
      style={[styles.featureCardWrapper, animatedStyle]}
      activeOpacity={0.9}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, bgStyle]}>
        <BlurView intensity={15} tint="dark" style={StyleSheet.absoluteFillObject}>
          <LinearGradient
            colors={[feature.color + '15', 'transparent']}
            style={StyleSheet.absoluteFillObject}
          />
        </BlurView>
      </Animated.View>

      <View style={styles.featureCardContent}>
        <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
          {feature.icon}
        </View>
        <Text style={styles.featureCardTitle}>{feature.title}</Text>
        <Text style={styles.featureCardDesc}>{feature.description}</Text>

        {isActive && (
          <Animated.View
            entering={FadeIn.duration(300)}
            style={styles.featureCardIndicator}
          >
            <LinearGradient
              colors={[feature.color, 'transparent']}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        )}
      </View>
    </AnimatedTouchable>
  );
};

// STAT CARD COMPONENT
const StatCard = ({
  stat,
  index,
  isExpanded,
  onPress,
}: {
  stat: any;
  index: number;
  isExpanded: boolean;
  onPress: () => void;
}) => {
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    scaleValue.value = withSpring(isExpanded ? 1.05 : 1);
  }, [isExpanded]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  return (
    <AnimatedTouchable
      entering={FadeInUp.delay(300 + index * 100).duration(800)}
      onPress={onPress}
      style={[styles.statCardWrapper, animatedStyle]}
      activeOpacity={0.8}
    >
      <BlurView intensity={20} tint="dark" style={styles.statCardBlur}>
        <View style={styles.statCardInner}>
          <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
            {stat.icon}
          </View>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>

          {isExpanded && (
            <Animated.Text
              entering={FadeIn.duration(300)}
              style={styles.statExpandedText}
            >
              {stat.detail}
            </Animated.Text>
          )}

          <View style={styles.statAccentLine}>
            <LinearGradient
              colors={[stat.color, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        </View>
      </BlurView>
    </AnimatedTouchable>
  );
};

// DATA CONSTANTS
const FEATURES = [
  {
    icon: <Zap color="#00ff9f" size={32} strokeWidth={2.5} />,
    title: 'Instant Booking',
    description: 'Book in seconds',
    fullDescription:
      'Our lightning-fast booking system gets you a ride in under 10 seconds. Real-time driver matching ensures you never wait long.',
    color: '#00ff9f',
  },
  {
    icon: <MapPin color="#00d4ff" size={32} strokeWidth={2.5} />,
    title: 'Smart Routes',
    description: 'AI-powered navigation',
    fullDescription:
      'Our advanced AI analyzes real-time traffic data to find the fastest route. Automatic rerouting saves you time and money.',
    color: '#00d4ff',
  },
  {
    icon: <Shield color="#ff006e" size={32} strokeWidth={2.5} />,
    title: 'Safety First',
    description: 'Verified drivers & SOS',
    fullDescription:
      'Every driver is background-checked. Share your trip with family, use emergency SOS, and enjoy 24/7 monitoring.',
    color: '#ff006e',
  },
  {
    icon: <Award color="#ffbe0b" size={32} strokeWidth={2.5} />,
    title: 'Best Prices',
    description: 'No hidden charges',
    fullDescription:
      'Transparent pricing calculated upfront. Compare prices, set budgets, and never be surprised by hidden fees.',
    color: '#ffbe0b',
  },
];

const STATS = [
  {
    icon: <Users color="#00ff9f" size={32} strokeWidth={2.5} />,
    value: '50K+',
    label: 'Happy Riders',
    detail: 'Trusted by riders across Ethiopia',
    color: '#00ff9f',
  },
  {
    icon: <Car color="#00d4ff" size={32} strokeWidth={2.5} />,
    value: '1,200+',
    label: 'Professional Drivers',
    detail: 'Verified and highly-rated partners',
    color: '#00d4ff',
  },
  {
    icon: <TrendingUp color="#ff006e" size={32} strokeWidth={2.5} />,
    value: '4.9★',
    label: 'App Rating',
    detail: 'Based on 8,000+ reviews',
    color: '#ff006e',
  },
];

const STEPS = [
  {
    title: 'Enter Your Location',
    description:
      'Set your pickup and drop-off points with precise GPS or manual entry',
  },
  {
    title: 'Choose Your Ride',
    description:
      'Select from Economy, Comfort, or Premium options with transparent pricing',
  },
  {
    title: 'Track Your Driver',
    description:
      'Real-time tracking, driver details, and estimated arrival time',
  },
  {
    title: 'Arrive Safely',
    description:
      'Complete your trip and rate your experience to help improve our service',
  },
];

const TESTIMONIALS = [
  {
    text: 'Finally a reliable transport solution in Addis Ababa. The app is smooth and drivers are professional.',
    author: 'Abebe M.',
  },
  {
    text: 'I use Derash daily for work. Never been late, always safe, and prices are fair compared to others.',
    author: 'Tigist T.',
  },
  {
    text: 'The SOS feature gave me peace of mind. Felt completely safe during all my rides.',
    author: 'Kamran K.',
  },
];

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: Platform.OS === 'ios' ? 12 : 8,
  },
  headerBlur: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    fontSize: 20,
    fontWeight: '900',
    color: '#00ff9f',
    letterSpacing: 3,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 24,
  },
  headerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  heroContainer: {
    height: height * 1.15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  gridBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#00ff9f',
  },
  glowOrb1: {
    position: 'absolute',
    top: 80,
    right: -120,
    width: 350,
    height: 350,
    borderRadius: 175,
  },
  glowOrb2: {
    position: 'absolute',
    bottom: 120,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  orbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 175,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 10,
    width: '100%',
  },
  logoBadge: {
    marginBottom: 28,
    borderRadius: 100,
    overflow: 'hidden',
  },
  badgeContainer: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  badgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 10,
  },
  badgeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#00ff9f',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00ff9f',
    marginLeft: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  heroTitlePart1: {
    fontSize: 64,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  highlightBox: {
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 4,
  },
  highlightGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  heroTitleHighlight: {
    fontSize: 64,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 2,
  },
  heroTitlePart2: {
    fontSize: 48,
    fontWeight: '900',
    color: '#a0a0a0',
    letterSpacing: 1,
    marginBottom: 20,
  },
  dividerContainer: {
    width: 140,
    height: 3,
    marginBottom: 28,
  },
  divider: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  heroDescription: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 48,
    maxWidth: 340,
  },
  ctaContainer: {
    width: '100%',
    gap: 14,
    marginBottom: 60,
  },
  primaryButtonWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00ff9f',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  secondaryButtonWrapper: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff20',
    overflow: 'hidden',
  },
  secondaryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  infoCard1: {
    position: 'absolute',
    bottom: 120,
    left: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff15',
  },
  infoCard2: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff15',
  },
  infoCardBlur: {
    padding: 16,
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 255, 159, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#00ff9f',
  },
  infoCardSubtitle: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 2,
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    backgroundColor: '#000000',
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  featuresContainer: {
    gap: 14,
    marginBottom: 32,
  },
  featureCardWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff10',
  },
  featureCardContent: {
    padding: 24,
    position: 'relative',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureCardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  featureCardDesc: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 20,
  },
  featureCardIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  featureDetailsCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff15',
  },
  detailsBlur: {
    padding: 28,
  },
  detailsContent: {
    gap: 12,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  detailsDescription: {
    fontSize: 15,
    color: '#a0a0a0',
    lineHeight: 24,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingBottom: 4,
  },
  detailsButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00ff9f',
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    position: 'relative',
  },
  statsTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 48,
    letterSpacing: 1,
  },
  statsGrid: {
    gap: 18,
  },
  statCardWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff10',
  },
  statCardBlur: {
    padding: 1,
  },
  statCardInner: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    position: 'relative',
  },
  statIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 44,
    fontWeight: '900',
    color: '#00ff9f',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    color: '#a0a0a0',
    fontWeight: '600',
    marginBottom: 8,
  },
  statExpandedText: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 20,
  },
  statAccentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  howItWorksSection: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    backgroundColor: '#000000',
  },
  stepsContainer: {
    gap: 20,
  },
  stepCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  stepNumberContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  stepNumberGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000000',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    flex: 1,
  },
  stepDescription: {
    fontSize: 15,
    color: '#a0a0a0',
    lineHeight: 22,
    marginLeft: 72,
  },
  stepConnector: {
    position: 'absolute',
    left: 27,
    bottom: -20,
    width: 2,
    height: 40,
  },
  connectorGradient: {
    width: '100%',
    height: '100%',
  },
  testimonialSection: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    backgroundColor: '#000000',
  },
  testimonialsContainer: {
    gap: 16,
  },
  testimonialCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  testimonialBlur: {
    padding: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  testimonialText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00ff9f',
  },
  finalCtaSection: {
    paddingHorizontal: 24,
    paddingVertical: 120,
    alignItems: 'center',
    position: 'relative',
  },
  ctaGlowEffect: {
    position: 'absolute',
    top: 0,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(0, 255, 159, 0.1)',
  },
  ctaMainTitle: {
    fontSize: 44,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
    maxWidth: 340,
  },
  finalCtaButton: {
    width: '100%',
    marginBottom: 28,
  },
  finalCtaButtonContent: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  finalCtaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  finalCtaButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  ctaFooterText: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 24,
  },
  footerLink: {
    paddingBottom: 4,
  },
  footerLinkText: {
    fontSize: 13,
    color: '#a0a0a0',
    fontWeight: '600',
  },
});