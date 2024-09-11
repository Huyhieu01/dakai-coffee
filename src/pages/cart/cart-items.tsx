import { FinalPrice } from "components/display/final-price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { Divider } from "components/divider";
import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { cartState } from "state";
import { CartItem } from "types/cart";
import { Box, Icon, Text } from "zmp-ui";

export const CartItems: FC = () => {
  const cart = useRecoilValue(cartState);
  const [editingItem, setEditingItem] = useState<CartItem | undefined>();

  return (
    <Box className="py-3 px-4">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {({ open }) => (
            <ListRenderer
              items={cart}
              limit={3}
              onClick={(item) => {
                setEditingItem(item);
                open();
              }}
              renderKey={({ product, options, quantity }) =>
                JSON.stringify({ product: product.id, options, quantity })
              }
              renderLeft={(item) => (
                <img
                  className="w-10 h-10 rounded-lg"
                  src={item.product.image}
                />
              )}
              renderRight={(item) => (
                <Box flex className="space-x-1">
                  <Box className="space-y-1 flex-1">
                    <Text size="small">{item.product.name}</Text>
                    <Text className="text-gray" size="xSmall">
                      <FinalPrice options={item.options}>
                        {item.product}
                      </FinalPrice>
                    </Text>
                    <Text className="text-gray" size="xxxSmall">
                      <DisplaySelectedOptions options={item.options}>
                        {item.product}
                      </DisplaySelectedOptions>
                    </Text>
                  </Box>
                  <Text className="text-primary font-medium" size="small">
                    x{item.quantity}
                  </Text>
                </Box>
              )}
            />
          )}
        </ProductPicker>
      ) : (
        <Text
          className="bg-background rounded-xl py-8 px-4 text-center text-gray"
          size="xxSmall"
        >
          Không có sản phẩm trong giỏ hàng
        </Text>
      )}
       <Divider></Divider>
       <Box className="space-y-3">
      <Text.Header>Địa chỉ của DAKAI Cafe</Text.Header>
      <ListRenderer
        items={[
          {
            left: <Icon icon="zi-home" className="my-auto"/>,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-medium text-sm text-primary">
                  100 Đường Võ Chí Công, Phường Thạnh Mỹ Lợi, Thành phố Thủ Đức, HCMC
                </Text.Header>
              </Box>
            ),
          },
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
    <Divider />
      <Box className="space-y-3">
      <Text.Header>Quý khách vui lòng lựa chọn</Text.Header>
      <ListRenderer
        items={[
          {
            left: <Icon icon="zi-favorite-list" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Hình thức thanh toán tại bàn
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-create-group-solid" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Hình thức giao hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>

    </Box>
  );
};
