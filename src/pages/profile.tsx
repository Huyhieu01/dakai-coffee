import React, { FC } from "react";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import { ListRenderer } from "components/list-renderer";
import { useToBeImplemented } from "hooks";

const Subscription: FC = () => {
  const onClick = useToBeImplemented();
  return (
    <Box className="m-4" onClick={onClick}>
      <Box
        className="bg-green text-white rounded-xl p-4 space-y-2"
        style={{
          backgroundImage: `url(${subscriptionDecor})`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Text.Title className="font-bold">Đăng ký thành viên</Text.Title>
        <Text size="xxSmall">Tích điểm đổi thưởng, mở rộng tiện ích</Text>
      </Box>
    </Box>
  );
};

const Personal: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-4">
      <ListRenderer
        title="Người dùng"
        onClick={onClick}
        items={[
          {
            left: <Icon icon="zi-user" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Thông tin tài khoản
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-clock-2" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Lịch sử đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Other: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-4">
      <ListRenderer
        title="Khác"
        onClick={onClick}
        items={[
          {
            left: <Icon icon="zi-star" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Đánh giá đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-call" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Liên hệ và góp ý
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const ProfilePage: FC = () => {
  return (
    <Page>
      <Header showBackIcon={true} title="Cá nhân" />
      <Subscription />
      <Personal />
      <div className="text-center text-[#a7a7a7] p-2">
        <p>Quý khách vui lòng cung cấp số điện thoại để kiểm tra tài khoản và lịch sử đơn hàng.</p>
      </div>
      <Other />
      <div className="text-center text-[#a7a7a7]">
        <p>Một thương hiệu của GP Farm</p>
        <p>Version 1.0.0</p>
      </div>
    </Page>
  );
};

export default ProfilePage;
