import {Platform} from 'react-native';
import {
  getBadgeCount,
  setBadgeCount,
  getNotificationBadgeSetting,
} from 'react-native-notification-badge';
// import ShortcutBadge from 'react-native-app-badge';

export async function setNotificationBadgeCount(count) {
  if (Platform.OS === 'ios') {
    const permission = await getNotificationBadgeSetting();
    if (permission === 'enabled') {
      await setBadgeCount(count);
    } else {
      console.log('Badge permission has not yet been granted....');
    }
  } else {
    // console.log("Badge permission has not yet been granted....111111")
    // ShortcutBadge.setCount(22);
    // console.log("Badge permission has not yet been granted....22222")
  }
}

export async function updateNotificationBadgeCount() {
  if (Platform.OS === 'ios') {
    const permission = await getNotificationBadgeSetting();
    if (permission === 'enabled') {
      const badgeCount = await getBadgeCount();
      await setBadgeCount(badgeCount - 1);
    } else {
      console.log('Badge permission has not yet been granted....');
    }
  } else {
    // console.log("Badge permission has not yet been granted....0000")
    // ShortcutBadge.getCount((count) => {
    //     console.log("Badge permission has not yet been granted....3333", count)
    //     ShortcutBadge.setCount(count - 1);
    //     console.log("Badge permission has not yet been granted....4444")
    // });
  }
}
