import axiosInstance from "@/axios";
import Banners from "@/components/shared/Banners";
import Blog from "@/components/shared/Blog";
import Brands from "@/components/shared/Brands";
import MainBanner from "@/components/shared/MainBanner";
import MainProducts from "@/components/shared/MainProducts";
import NewProducts from "@/components/shared/NewProducts";
import TelegramPromotions from "@/components/shared/TelegramPromotions";
import { IGetData, IGetMainProducts } from "@/types";

export default async function Home() {
  const res = await axiosInstance.get("/get-data/");
  const getData: IGetData = res.data;
  const mainProds = getData.groups.filter((el) => el.is_main == 1);

  const mainProduct1 = await axiosInstance.get("/get-main-products", {
    params: {
      url: mainProds[0].url,
    },
  });
  const mainProduct2 = await axiosInstance.get("/get-main-products", {
    params: {
      url: mainProds[1].url,
    },
  });
  const mainProduct3 = await axiosInstance.get("/get-main-products", {
    params: {
      url: mainProds[2].url,
    },
  });

  const asiaInfo = getData.groups.find(
    (el) => el.id ==  mainProds[0].id
  );
  const organicInfo = getData.groups.find(
    (el) => el.id ==  mainProds[1].id
  );
  const badsInfo = getData.groups.find(
    (el) => el.id ==  mainProds[2].id
  );

  const asia: IGetMainProducts = mainProduct1.data;
  const organic: IGetMainProducts = mainProduct2.data;
  const bads: IGetMainProducts = mainProduct3.data;

  return (
    <>
      <MainBanner sliders={getData.sliders} />
      <Banners banners={getData.banners} />
      <NewProducts newProducts={getData.newProducts} title="Новинки" />
      <Brands brands={getData.brands} />
      <MainProducts
        products={asia.products}
        groupInfo={asiaInfo!}
        position={"left"}
      />
      <MainProducts
        products={organic.products}
        groupInfo={organicInfo!}
        position={"right"}
      />
      <NewProducts newProducts={getData.topProducts} title="Хиты" />
      <MainProducts
        products={bads.products}
        groupInfo={badsInfo!}
        position={"left"}
      />
      <TelegramPromotions />
      <Blog title="Блог" blogs={getData.blogs} />
    </>
  );
}
