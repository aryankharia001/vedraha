// services/metaCapi.js

import bizSdk from "facebook-nodejs-business-sdk";
import crypto from "crypto";

const {
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content,
  FacebookAdsApi,
} = bizSdk;

const FB_TEST_EVENT_CODE = "TEST90423";
const FB_PIXEL_ID = "2025318038197449";
const FB_ACCESS_TOKEN = "EAARpWmAjBnEBRbhJOO8gMO7OJGJKIvXHFMAmqZA0OWbz0K5mo2qhlBkAx5Y2ubnUyOAHPQhD2N7dETfj2bIYRsWoeEFqwRZB8FUeHx1pyXbqRXhK1jCAZCT53Ic1vaiFtbFZBKqwo4ODYPnU6Qds8H9A4we5pWDEoFUbEqeW7KINXZA1Kvcxe7TuwEzmciwZDZD";

// ─── Pixel registry ───────────────────────────────────────────────────────────
// Add as many pixels as you need: { "PIXEL_ID": "ACCESS_TOKEN" }

const pixelData = {
  [FB_PIXEL_ID]: FB_ACCESS_TOKEN,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hashData(value) {
  if (!value) return null;

  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function buildFbcFromFbclid(fbclid) {
  if (!fbclid) return null;

  return `fb.1.${Date.now()}.${fbclid}`;
}

// ─── Core function ────────────────────────────────────────────────────────────

export async function firePixel({
  pixel,
  phone,
  name,
  fbclid,
  fbp,
  ip,
  user_agent,
  eventName = "Lead",
  eventSourceUrl,
  currency,
  value,
  num_items,
  contents = [],
}) {
  try {
    const accessToken = pixelData[pixel];

    if (!accessToken) {
      return {
        success: false,
        error: `No pixel token for pixel ID: ${pixel}`,
      };
    }

    FacebookAdsApi.init(accessToken);

    const timestamp = Math.floor(Date.now() / 1000);

    const eventId = `evt_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    // fbc is built from fbclid
    // fbp comes directly from the _fbp cookie

    const fbc = buildFbcFromFbclid(fbclid);

    const userData = new UserData()
      .setPhones(phone ? [hashData(phone)] : [])
      .setFirstNames(name ? [hashData(name)] : [])
      .setFbc(fbc || undefined)
      .setFbp(fbp || undefined)
      .setClientIpAddress(ip)
      .setClientUserAgent(user_agent);

    const customData = new CustomData();

    if (currency) customData.setCurrency(currency);

    if (value != null) {
      customData.setValue(value);
    }

    if (num_items != null) {
      customData.setNumItems(num_items);
    }

    if (contents.length > 0) {
      customData.setContents(
        contents.map((c) => {
  const item = new Content();

  if (c.id) {
    item.setId(String(c.id));        // ✅ correct method
  }

  if (c.quantity) {
    item.setQuantity(c.quantity);
  }

  if (c.item_price != null) {
    item.setItemPrice(c.item_price);
  }

  if (c.title) {
    item.setTitle(c.title);
  }

  return item;
})
      );
    }

    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(timestamp)
      .setEventId(eventId)
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website");

    if (eventSourceUrl) {
      serverEvent.setEventSourceUrl(eventSourceUrl);
    }

    const eventRequest = new EventRequest(accessToken, pixel).setEvents([
      serverEvent,
    ]);

    // Remove FB_TEST_EVENT_CODE in production

    if (FB_TEST_EVENT_CODE) {
      eventRequest.setTestEventCode(FB_TEST_EVENT_CODE);
    }

    const response = await eventRequest.execute();

    return {
      success: true,
      eventId,
      data: response,
    };
  } catch (error) {
    console.error("🔥 Error firing Meta CAPI:", error);

    return {
      success: false,
      error: error.message || String(error),
    };
  }
}

export { pixelData };