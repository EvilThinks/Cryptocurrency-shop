import React from 'react';
import { Button, notification, Collapse } from 'antd';
import 'antd/es/button/style/css';
import 'antd/es/notification/style/css';

export const showNotification = (type, message, description) => {
  const { Panel } = Collapse;
  const btn = (
    <Button
      type="primary"
      size="default"
      onClick={() => notification.close(key)}
    >
      OK!
    </Button>
  );
  const CollapsableDescription = (
    <Collapse expandIconPosition="right" destroyInactivePanel={true}>
      <Panel key={1} header={description.substring(0, 60)}>
        {description}
      </Panel>
    </Collapse>
  );
  const key = `notify${Date.now()}`;

  notification[type]({
    key,
    message,
    description: description.length < 60 ? description : CollapsableDescription,
    btn,
    duration: type === 'success' ? 0 : 3,
    placement: 'bottomRight'
  });
};
