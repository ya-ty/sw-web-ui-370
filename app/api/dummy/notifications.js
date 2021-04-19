import {
  CheckOutlined, Eject, Close, DescriptionOutlined, Settings, VolumeUp, Receipt, Equalizer
} from '@material-ui/icons';
import {
  green, red, blue, orange, purple
} from '@material-ui/core/colors';

const nextActionsIcons = {
  'smallEsc.png': CheckOutlined,
  'ThumbsUp.png': Eject,
  'ThumbsDown.png': Close,
};

const summaryIcons = {
  ID101: {
    icon: DescriptionOutlined,
    color: green
  },
  ID102: {
    icon: VolumeUp,
    color: red
  },
  ID103: {
    icon: Settings,
    color: blue
  },
  ID104: {
    icon: Receipt,
    color: orange
  },
  ID105: {
    icon: Equalizer,
    color: purple
  },
  ID107: {
    icon: DescriptionOutlined,
    color: green
  },
  common: {
    icon: Settings,
    color: blue
  }
};

const priority = {
  high: 'high',
  medium: 'medium',
  low: 'low',
};

export class Notification {
  constructor(notification) {
    const {
      id, Category, type, Zone, Time, Priority, SLA, NextActions, Summary, Detailed, SuccessAction, Evidence
    } = notification;

    this.id = id;
    this.category = Category;
    this.type = `${type}s`;
    this.zone = Zone;
    this.time = Time;
    this.priority = Priority.toLowerCase();
    this.sla = {
      slaExpiry: +(SLA.SLAExpiry),
      slaReminder: `${SLA.SLAReminder}s`
    };
    this.nextActions = NextActions.map(action => ({ ...action, SmallIcon: nextActionsIcons[action.smallIcon] }));
    this.summary = {
      ...Summary,
      showSla: Summary.showSLA.toLowerCase() === 'true',
      SummaryIcon: summaryIcons[id] ? summaryIcons[id].icon : summaryIcons.common.icon,
      summaryIconColor: summaryIcons[id] ? summaryIcons[id].color[400] : summaryIcons.common.color
    };
    this.detailed = Detailed;
    this.successAction = SuccessAction;
    this.evidence = Evidence;
  }
}

export class Notifications {
  constructor(notifications) {
    this.notifications = notifications;
  }

  get items() {
    return this.notifications;
  }

  get notificationsAmount() {
    return this.notifications.length;
  }

  get highPriorityNotificationsAmount() {
    const filteredNotifications = this.notifications.filter(notification => notification.priority === priority.high);
    return filteredNotifications.length;
  }

  get lowPriorityNotificationsAmount() {
    const filteredNotifications = this.notifications.filter(notification => notification.priority !== priority.high);
    return filteredNotifications.length;
  }

  get notificationTypes() {
    const allNotificationTypes = this.notifications.map(notification => notification.type);
    return [...new Set(allNotificationTypes)];
  }

  getNotificationsByType(type) {
    return this.notifications.filter(notification => notification.type === type);
  }
}
