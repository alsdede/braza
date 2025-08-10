import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { router } from "expo-router";
import { GallerySection as GallerySectionType } from "../../types/sanity";
import { getSanityImageUrl } from "../../utils/sanityImage";

interface GallerySectionProps {
  section: GallerySectionType;
}

const { width: screenWidth } = Dimensions.get("window");

export default function GallerySection({ section }: GallerySectionProps) {
  console.log("sections", section.images[0]);
  if (!section.images?.length) {
    return null;
  }

  const handleImagePress = (linkTo?: { _ref: string; _type: "reference" }) => {
    if (linkTo?._ref) {
      // Navigate to the referenced page
      router.push(`/page/${linkTo._ref}`);
    }
  };

  const renderGridLayout = () => {
    const numColumns = 2;
    const imageSize = (screenWidth - 48 - 8) / numColumns; // padding and gap

    return (
      <View style={styles.gridContainer}>
        {section.images.map((image, index) => (
          <TouchableOpacity
            key={image._key || index}
            style={[styles.gridItem, { width: imageSize, height: imageSize }]}
            onPress={() => handleImagePress(image.linkTo)}
            activeOpacity={0.8}
          >
            <Image
              source={{
                uri:
                  getSanityImageUrl(
                    { asset: image.asset, _type: "image" },
                    {
                      width: imageSize * 2,
                      height: imageSize * 2,
                      fit: "crop",
                    }
                  ) || "",
              }}
              style={styles.gridImage}
              resizeMode="cover"
            />
            {image.caption && (
              <View style={styles.captionOverlay}>
                <Text style={styles.captionText} numberOfLines={2}>
                  {image.caption}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCarouselLayout = () => {
    const itemWidth = screenWidth;

    const renderCarouselItem = ({
      item,
      index,
    }: {
      item: any;
      index: number;
    }) => {
      console.log(
        getSanityImageUrl(
          { asset: item.asset, _type: "image" },
          {
            width: itemWidth * 2,
            height: 300 * 2,
            fit: "crop",
          }
        )
      );
      return (
        <TouchableOpacity
          style={[styles.carouselItem, { width: itemWidth }]}
          onPress={() => handleImagePress(item.linkTo)}
          activeOpacity={0.8}
        >
          <Image
            source={{
              uri:
                getSanityImageUrl({ asset: item.asset, _type: "image" }) || "",
            }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
          {item.caption && (
            <View style={styles.carouselCaption}>
              <Text style={styles.carouselCaptionText} numberOfLines={2}>
                {item.caption}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.carouselContainer}>
        <Carousel
          width={itemWidth}
          height={300}
          data={section.images}
          scrollAnimationDuration={300}
          mode="parallax"
          loop={false}
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          renderItem={renderCarouselItem}
          style={styles.carousel}
          pagingEnabled
          snapEnabled
        />
      </View>
    );
  };

  const renderMasonryLayout = () => {
    // Simple masonry effect with alternating heights
    const getImageHeight = (index: number) => {
      const heights = [200, 250, 180, 220, 190];
      return heights[index % heights.length];
    };

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.masonryContainer}
      >
        {section.images.map((image, index) => {
          const imageHeight = getImageHeight(index);
          const imageWidth = 150;

          return (
            <TouchableOpacity
              key={image._key || index}
              style={[
                styles.masonryItem,
                { width: imageWidth, height: imageHeight },
              ]}
              onPress={() => handleImagePress(image.linkTo)}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri:
                    getSanityImageUrl(
                      { asset: image.asset, _type: "image" },
                      {
                        width: imageWidth * 2,
                        height: imageHeight * 2,
                        fit: "crop",
                      }
                    ) || "",
                }}
                style={styles.masonryImage}
                resizeMode="cover"
              />
              {image.caption && (
                <View style={styles.captionOverlay}>
                  <Text style={styles.captionText} numberOfLines={1}>
                    {image.caption}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const renderLayout = () => {
    switch (section.layout) {
      case "carousel":
        return renderCarouselLayout();
      case "masonry":
        return renderMasonryLayout();
      case "grid":
      default:
        return renderGridLayout();
    }
  };

  return (
    <View style={styles.container}>
      {section.title && <Text style={styles.title}>{section.title}</Text>}
      {section.subtitle && (
        <Text style={styles.subtitle}>{section.subtitle}</Text>
      )}
      {renderLayout()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    marginHorizontal: 16,
    lineHeight: 22,
  },

  // Grid Layout
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 8,
  },
  gridItem: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },

  // Carousel Layout
  carouselContainer: {
    alignItems: "center",
  },
  carousel: {
    width: screenWidth,
  },
  carouselItem: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    backgroundColor: "#fff",
  },
  carouselImage: {
    width: "100%",
    height: 240,
  },
  carouselCaption: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
    alignItems: "flex-start",
  },
  carouselCaptionText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },

  // Masonry Layout
  masonryContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  masonryItem: {
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  masonryImage: {
    width: "100%",
    height: "100%",
  },

  // Caption Overlay
  captionOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
  },
  captionText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});
