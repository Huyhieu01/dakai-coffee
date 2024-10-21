import { FinalPrice } from "components/display/final-price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { Divider } from "components/divider";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, paymentMethodState, userState } from "state";
import { CartItem } from "types/cart";
import { Box, Icon, Modal, Text } from "zmp-ui";
import { DeliveryShip } from "./delivery-ship";

export const CartItems: FC = () => {
  const cart = useRecoilValue(cartState);
  const [editingItem, setEditingItem] = useState<CartItem | undefined>();
  const [showDelivery, setShowDelivery] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedCard, setSelectCard] = useState(null);

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setModalVisible(false); 
  };
  const [selectedMethod, setSelectedMethod] = useState<"table" | "delivery" | "card" | null>(null); // Thêm state để lưu phương thức thanh toán
  const setPaymentMethod = useSetRecoilState(paymentMethodState); // Thêm state để lưu phương thức thanh toán

  const renderTableButtons = () => {
    const tables = [
      '01', '02', '03', '04', '05',
      '06', '07', '08', '09', '10',
      '11', '12', '13', '14', '15',
      '16', '17', '18', '19', '20'
    ];

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tables.map((table) => (
          <button 
            key={table} 
            onClick={() => handleTableSelect(table)}
            style={{ 
              margin: '5px', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '5px',
              backgroundColor: selectedTable === table ? '#197df8' : 'white',
              color: selectedTable === table ? 'white' : 'black',
              width: '50px', // Thêm width
              height: '50px'  // Thêm height
            }}
          >
            {table}
          </button>
        ))}
      </div>
    );
  };

  const handleMethodClick = (method: "table" | "delivery" | "card") => {
    setSelectedMethod(method); 
    setPaymentMethod(method);

    if (method === "table") { 
      setShowDelivery(false); // Ẩn form giao hàng
      setModalVisible(true);
    } else if (method === "delivery") { 
      setShowDelivery(true); // Hiện form giao hàng
      setSelectedTable(null); // Reset lựa chọn bàn
      setModalVisible(false); // Đóng modal chọn bàn
    } else if (method === "card") {
      
    }


  };

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
      <Text.Header>Hình thức thanh toán</Text.Header>
      <ListRenderer
        items={[
          {
            left: <Icon icon="zi-favorite-list" />,
            right: (
              <div onClick={() => handleMethodClick("table")}>
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal"
                style={{ color: selectedMethod === "table" ? "#197df8" : "" }} // Đổi màu chữ khi chọn
                >
                  Thanh toán tại bàn
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            </div>
            ),
          },
          {
            left: <Icon icon="zi-create-group-solid" />,
            right: (
              <div onClick={() => handleMethodClick("delivery")}>
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal"
                style={{ color: selectedMethod === "delivery" ? "#197df8" : "" }} // Đổi màu chữ khi chọn
                >
                  Giao hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
              </div>
            ),
          },
          {
            left: <Icon icon="zi-qrline" />,
            right: (
              <div onClick={() => handleMethodClick("card")}>
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal"
                style={{ color: selectedMethod === "card" ? "#197df8" : "" }} // Đổi màu chữ khi chọn
                >
                  Thẻ thành viên
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
              </div>
            ),
          },
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
    <br></br>
    {showDelivery && <DeliveryShip />}
    <Modal
        visible={modalVisible}
        title="Sơ đồ chọn bàn"
        onClose={() => {
          setModalVisible(false);
        }}
        zIndex={1200}
        actions={[
          {
            text: "Thoát",
            close: true,
            highLight: false,
            danger: true
          },
        ]}
        description="Quý khách vui lòng chọn bàn và chờ trong ít phút, nhân viên sẽ phục vụ Quý khách ngay ạ!"
      >
        <br></br>
        {renderTableButtons()}
      </Modal>
      {selectedTable && (
        <div>
          <p className="">Quý khách đã chọn bàn: <span style={{color:"#197df8", fontSize:"20px", fontWeight:"bold"}}>{selectedTable}</span> </p> 
        </div>
      )}
      {selectedCard && (
        <div>
          <p style={{color:"#197df8", fontSize:"20px", fontWeight:"bold"}}>Đang kiểm tra thông tin....</p>
        </div>
      )}
    </Box>
  );
};
