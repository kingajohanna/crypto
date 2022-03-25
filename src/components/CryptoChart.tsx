import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import styled from "styled-components/native";

import { Colors } from "@theme/Colors";

const { width: SIZE } = Dimensions.get("window");

type CryptoChartProps = {
    imageUrl?: string;
    name?: string;
    shortName?: string;
    price?: number;
    priceChange?: number;
    sparkline?: any;
};

const format = (n: string) => {
    return parseFloat(n).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export const CryptoChart: React.FC<CryptoChartProps> = ({ imageUrl, name, shortName, price, priceChange, sparkline }) => {
    return (
        <Container>
            <UpperContainer>
                <CoinContainer>
                    <Image source={{ uri: imageUrl }} />
                    <Text>
                        {name} ({shortName?.toUpperCase()})
                    </Text>
                </CoinContainer>
                <Text>last 7 days</Text>
            </UpperContainer>
            <LowerContainer>
                <Price>${price?.toLocaleString("en-US")}</Price>
                <PriceChangeText priceChange={priceChange}>{priceChange?.toFixed(2)}%</PriceChangeText>
            </LowerContainer>
            <LineChart.Provider data={sparkline.price}>
                <LineChart.PriceText
                    format={({ value }) => {
                        "worklet";
                        let formatted = "";
                        if (value)
                            formatted = parseFloat(value).toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            });
                        return `${formatted}`;
                    }}
                    style={{ color: Colors.silverSand }}
                />
                <LineChart.DatetimeText style={{ color: Colors.silverSand }} />
                <LineChart height={250}>
                    <LineChart.Path color={Colors.cadetBlue} />
                    <LineChart.CursorCrosshair color={Colors.fluorescentBlue} />
                </LineChart>
            </LineChart.Provider>
        </Container>
    );
};

const Container = styled.View({
    padding: 16,
    flexDirection: "column",
});

const UpperContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

const LowerContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
});

const CoinContainer = styled.View({
    flexDirection: "row",
    alignItems: "center",
});

const Image = styled.Image({
    width: 24,
    height: 24,
    marginRight: 8,
});

const Text = styled.Text({
    fontSize: 14,
    color: Colors.silverSand,
});

const Price = styled.Text({
    fontSize: 24,
    color: Colors.silverSand,
    fontWeight: "bold",
});

const PriceChangeText = styled.Text<CryptoChartProps>(({ priceChange }) => ({
    fontSize: 18,
    color: priceChange! > 0 ? "#00ff00" : "#ff0000",
}));

const ChartContainer = styled.View({
    marginTop: 15,
});

const data = [
    {
        timestamp: 1625261034,
        value: 1.3551291378689263,
    },
    {
        timestamp: 1625264634,
        value: 1.362582270029769,
    },
    {
        timestamp: 1625268234,
        value: 1.3681663841063374,
    },
    {
        timestamp: 1625271834,
        value: 1.3561527857328077,
    },
    {
        timestamp: 1625275434,
        value: 1.3751404391198694,
    },
    {
        timestamp: 1625279034,
        value: 1.3896907801252363,
    },
    {
        timestamp: 1625282634,
        value: 1.3950917178971345,
    },
    {
        timestamp: 1625286234,
        value: 1.3788451744373615,
    },
    {
        timestamp: 1625289834,
        value: 1.383470336395255,
    },
    {
        timestamp: 1625293434,
        value: 1.371201842833214,
    },
    {
        timestamp: 1625297034,
        value: 1.3683480718040912,
    },
    {
        timestamp: 1625300634,
        value: 1.3673818624858043,
    },
    {
        timestamp: 1625304234,
        value: 1.3789955924324253,
    },
    {
        timestamp: 1625307834,
        value: 1.3789807215350538,
    },
    {
        timestamp: 1625311434,
        value: 1.4121758497608388,
    },
    {
        timestamp: 1625315034,
        value: 1.3993984014210556,
    },
    {
        timestamp: 1625318634,
        value: 1.4324743792294536,
    },
    {
        timestamp: 1625322234,
        value: 1.430122392755596,
    },
    {
        timestamp: 1625325834,
        value: 1.4217144251331186,
    },
    {
        timestamp: 1625329434,
        value: 1.417822461233701,
    },
    {
        timestamp: 1625333034,
        value: 1.4229044547156076,
    },
    {
        timestamp: 1625336634,
        value: 1.4227645701831335,
    },
    {
        timestamp: 1625340234,
        value: 1.4261578053611006,
    },
    {
        timestamp: 1625343834,
        value: 1.417885239658124,
    },
    {
        timestamp: 1625347434,
        value: 1.4290006330753278,
    },
    {
        timestamp: 1625351034,
        value: 1.4246505508621137,
    },
    {
        timestamp: 1625354634,
        value: 1.426715625764535,
    },
    {
        timestamp: 1625358234,
        value: 1.427137585072395,
    },
    {
        timestamp: 1625361834,
        value: 1.420166757674531,
    },
    {
        timestamp: 1625365434,
        value: 1.4045866658377517,
    },
    {
        timestamp: 1625369034,
        value: 1.4096155624434996,
    },
    {
        timestamp: 1625372634,
        value: 1.4010734226470107,
    },
    {
        timestamp: 1625376234,
        value: 1.3921898602327103,
    },
    {
        timestamp: 1625379834,
        value: 1.3985010458216058,
    },
    {
        timestamp: 1625383434,
        value: 1.4005677621225672,
    },
    {
        timestamp: 1625387034,
        value: 1.423734083672304,
    },
    {
        timestamp: 1625390634,
        value: 1.4295810574669927,
    },
    {
        timestamp: 1625394234,
        value: 1.4438997808198413,
    },
    {
        timestamp: 1625397834,
        value: 1.4456718470874645,
    },
    {
        timestamp: 1625401434,
        value: 1.4403465634815833,
    },
    {
        timestamp: 1625405034,
        value: 1.4327428849865582,
    },
    {
        timestamp: 1625408634,
        value: 1.4463235294578018,
    },
    {
        timestamp: 1625412234,
        value: 1.4423754810035139,
    },
    {
        timestamp: 1625415834,
        value: 1.4408467109851082,
    },
    {
        timestamp: 1625419434,
        value: 1.4302621804396098,
    },
    {
        timestamp: 1625423034,
        value: 1.4363300567328972,
    },
    {
        timestamp: 1625426634,
        value: 1.4400604017150311,
    },
    {
        timestamp: 1625430234,
        value: 1.4444984175770443,
    },
    {
        timestamp: 1625433834,
        value: 1.449618553546183,
    },
    {
        timestamp: 1625437434,
        value: 1.451813940706993,
    },
    {
        timestamp: 1625441034,
        value: 1.467951067090331,
    },
    {
        timestamp: 1625444634,
        value: 1.466075053641233,
    },
    {
        timestamp: 1625448234,
        value: 1.4980740243360373,
    },
    {
        timestamp: 1625451834,
        value: 1.4598637750612455,
    },
    {
        timestamp: 1625455434,
        value: 1.45668654476562,
    },
    {
        timestamp: 1625459034,
        value: 1.4375748630658982,
    },
    {
        timestamp: 1625462634,
        value: 1.429685397775091,
    },
    {
        timestamp: 1625466234,
        value: 1.4226993512853428,
    },
    {
        timestamp: 1625469834,
        value: 1.4237037209225707,
    },
    {
        timestamp: 1625473434,
        value: 1.4378251555529173,
    },
    {
        timestamp: 1625477034,
        value: 1.4205077708784362,
    },
    {
        timestamp: 1625480634,
        value: 1.4255933390784612,
    },
    {
        timestamp: 1625484234,
        value: 1.4260445448589016,
    },
    {
        timestamp: 1625487834,
        value: 1.4227189009603094,
    },
    {
        timestamp: 1625491434,
        value: 1.42225479571916,
    },
    {
        timestamp: 1625495034,
        value: 1.4411247591574559,
    },
    {
        timestamp: 1625498634,
        value: 1.3898847431871348,
    },
    {
        timestamp: 1625502234,
        value: 1.3934649833142294,
    },
    {
        timestamp: 1625505834,
        value: 1.408491820028034,
    },
    {
        timestamp: 1625509434,
        value: 1.418110427923589,
    },
    {
        timestamp: 1625513034,
        value: 1.4047152956890396,
    },
    {
        timestamp: 1625516634,
        value: 1.4036676015555258,
    },
    {
        timestamp: 1625520234,
        value: 1.3936599734497501,
    },
    {
        timestamp: 1625523834,
        value: 1.4225798682056894,
    },
    {
        timestamp: 1625527434,
        value: 1.426925561215023,
    },
    {
        timestamp: 1625531034,
        value: 1.4127434749934167,
    },
    {
        timestamp: 1625534634,
        value: 1.4265102023217673,
    },
    {
        timestamp: 1625538234,
        value: 1.4278805766764586,
    },
    {
        timestamp: 1625541834,
        value: 1.4148843591874958,
    },
    {
        timestamp: 1625545434,
        value: 1.4337908463639657,
    },
    {
        timestamp: 1625549034,
        value: 1.4187169005476947,
    },
    {
        timestamp: 1625552634,
        value: 1.4197447256968043,
    },
    {
        timestamp: 1625556234,
        value: 1.4244186374275327,
    },
    {
        timestamp: 1625559834,
        value: 1.4577797746307377,
    },
    {
        timestamp: 1625563434,
        value: 1.4535761401551477,
    },
    {
        timestamp: 1625567034,
        value: 1.453352945958086,
    },
    {
        timestamp: 1625570634,
        value: 1.4487582850908787,
    },
    {
        timestamp: 1625574234,
        value: 1.4507889384571029,
    },
    {
        timestamp: 1625577834,
        value: 1.4261155400421437,
    },
    {
        timestamp: 1625581434,
        value: 1.4123870793823996,
    },
    {
        timestamp: 1625585034,
        value: 1.4314800980065414,
    },
    {
        timestamp: 1625588634,
        value: 1.4382545412906622,
    },
    {
        timestamp: 1625592234,
        value: 1.4263490846975784,
    },
    {
        timestamp: 1625595834,
        value: 1.4214322762856562,
    },
    {
        timestamp: 1625599434,
        value: 1.4214322762856562,
    },
    {
        timestamp: 1625603034,
        value: 1.4163893990103977,
    },
    {
        timestamp: 1625606634,
        value: 1.4155187029761473,
    },
    {
        timestamp: 1625610234,
        value: 1.406546279654965,
    },
    {
        timestamp: 1625613834,
        value: 1.4056429352487199,
    },
    {
        timestamp: 1625617434,
        value: 1.4143911574732444,
    },
    {
        timestamp: 1625621034,
        value: 1.4017213629205405,
    },
    {
        timestamp: 1625624634,
        value: 1.3935118686290622,
    },
    {
        timestamp: 1625628234,
        value: 1.4141089616285445,
    },
    {
        timestamp: 1625631834,
        value: 1.4148204926827106,
    },
    {
        timestamp: 1625635434,
        value: 1.417067680446939,
    },
    {
        timestamp: 1625639034,
        value: 1.4155993838893273,
    },
    {
        timestamp: 1625642634,
        value: 1.4248242217373963,
    },
    {
        timestamp: 1625646234,
        value: 1.4326766657015109,
    },
    {
        timestamp: 1625649834,
        value: 1.4364946762248207,
    },
    {
        timestamp: 1625653434,
        value: 1.4314163365707988,
    },
    {
        timestamp: 1625657034,
        value: 1.4371224535054163,
    },
    {
        timestamp: 1625660634,
        value: 1.4351521078927418,
    },
    {
        timestamp: 1625664234,
        value: 1.4288227582690771,
    },
    {
        timestamp: 1625667834,
        value: 1.423835372427289,
    },
    {
        timestamp: 1625671434,
        value: 1.4237506320243583,
    },
    {
        timestamp: 1625675034,
        value: 1.4313658357187837,
    },
    {
        timestamp: 1625678634,
        value: 1.4344107777334598,
    },
    {
        timestamp: 1625682234,
        value: 1.434710321324069,
    },
    {
        timestamp: 1625685834,
        value: 1.4248825129927831,
    },
    {
        timestamp: 1625689434,
        value: 1.4214950497521988,
    },
    {
        timestamp: 1625693034,
        value: 1.4273565508813792,
    },
    {
        timestamp: 1625696634,
        value: 1.422954528684551,
    },
    {
        timestamp: 1625700234,
        value: 1.4247167472952513,
    },
    {
        timestamp: 1625703834,
        value: 1.4227496564945321,
    },
    {
        timestamp: 1625707434,
        value: 1.4167268029126225,
    },
    {
        timestamp: 1625711034,
        value: 1.4117509236530623,
    },
    {
        timestamp: 1625714634,
        value: 1.410596798909041,
    },
    {
        timestamp: 1625718234,
        value: 1.4034804888744814,
    },
    {
        timestamp: 1625721834,
        value: 1.3899112830074105,
    },
    {
        timestamp: 1625725434,
        value: 1.3918501528319027,
    },
    {
        timestamp: 1625729034,
        value: 1.3935390266843781,
    },
    {
        timestamp: 1625732634,
        value: 1.389703374515258,
    },
    {
        timestamp: 1625736234,
        value: 1.3874509277379214,
    },
    {
        timestamp: 1625739834,
        value: 1.376781434222806,
    },
    {
        timestamp: 1625743434,
        value: 1.3722467751035545,
    },
    {
        timestamp: 1625747034,
        value: 1.3495991992583631,
    },
    {
        timestamp: 1625750634,
        value: 1.3634301756748834,
    },
    {
        timestamp: 1625754234,
        value: 1.3684307848855746,
    },
    {
        timestamp: 1625757834,
        value: 1.3670474833293251,
    },
    {
        timestamp: 1625761434,
        value: 1.3733665110478,
    },
    {
        timestamp: 1625765034,
        value: 1.3685106136714322,
    },
    {
        timestamp: 1625768634,
        value: 1.3472500407997825,
    },
    {
        timestamp: 1625772234,
        value: 1.3631643460219884,
    },
    {
        timestamp: 1625775834,
        value: 1.3677407885449646,
    },
    {
        timestamp: 1625779434,
        value: 1.365029415891886,
    },
    {
        timestamp: 1625783034,
        value: 1.3770772239314955,
    },
    {
        timestamp: 1625786634,
        value: 1.3671022007425453,
    },
    {
        timestamp: 1625790234,
        value: 1.3637168116033365,
    },
    {
        timestamp: 1625793834,
        value: 1.3580555777013152,
    },
    {
        timestamp: 1625797434,
        value: 1.3542397688860566,
    },
    {
        timestamp: 1625801034,
        value: 1.3292023792673386,
    },
    {
        timestamp: 1625804634,
        value: 1.3468246740938277,
    },
    {
        timestamp: 1625808234,
        value: 1.2984284889214313,
    },
    {
        timestamp: 1625811834,
        value: 1.3038858456564055,
    },
    {
        timestamp: 1625815434,
        value: 1.3181250216422522,
    },
    {
        timestamp: 1625819034,
        value: 1.3239298915362527,
    },
    {
        timestamp: 1625822634,
        value: 1.3375048498682163,
    },
    {
        timestamp: 1625826234,
        value: 1.3391593846885308,
    },
    {
        timestamp: 1625829834,
        value: 1.3295156310470309,
    },
    {
        timestamp: 1625833434,
        value: 1.3325309115445563,
    },
    {
        timestamp: 1625837034,
        value: 1.3277661699968266,
    },
    {
        timestamp: 1625840634,
        value: 1.3320694344534325,
    },
    {
        timestamp: 1625844234,
        value: 1.325363209911652,
    },
    {
        timestamp: 1625847834,
        value: 1.327751717713971,
    },
    {
        timestamp: 1625851434,
        value: 1.3376502624969313,
    },
    {
        timestamp: 1625855034,
        value: 1.3586885237212771,
    },
    {
        timestamp: 1625858634,
        value: 1.369906426577057,
    },
    {
        timestamp: 1625862234,
        value: 1.3687371763376244,
    },
    {
        timestamp: 1625865834,
        value: 1.3593579647664777,
    },
];
