import React, { useState, useEffect } from "react";
import { PriceListSettingsStyled, PriceList, PriceListForm } from "./PriceListSettings.styled";
import PriceListElement from "../PriceListElement/PriceListElement";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    FormInfo,
    FormGroup,
    LabelStyled,
    SubmitButton,
    FieldStyled,
    ErrorMessageStyled
} from "../../../components/SharedStyledComponents/Form.styled";
import { Profile as ProfileApi, AddPriceListElementProps } from "../../../api";

const priceListFormValidationSchema = Yup.object().shape({
    elementName: Yup.string().required("Element name is required"),
    price: Yup.number()
        .integer("Field must be a number")
        .positive("Price must be a positive number")
        .required("Price is required")
});

type Props = {
    profileId: string;
    priceList: any[];
    onPriceListUpdate: (data: any) => any
};

const PriceListSettings = (props: Props) => {
    let { profileId } = props;

    const [priceList, setPriceList] = useState(props.priceList);

    useEffect(() => {
        props.onPriceListUpdate(priceList);
    }, [priceList])

    const onDelete = (id: string) => {
        ProfileApi.deletePriceListElement(id)
            .then(res => {
                setPriceList(priceList.filter(e => e.id !== id));
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <PriceListSettingsStyled>
            <PriceList>
                {priceList.map((element: any) => {
                    return (
                        <PriceListElement
                            key={element.id}
                            elementName={element.elementName}
                            price={element.price}
                            editable={true}
                            onDelete={onDelete}
                            id={element.id}
                        />
                    );
                })}
            </PriceList>
            <Formik
                initialValues={{ elementName: "", price: "" }}
                validationSchema={priceListFormValidationSchema}
                onSubmit={values => {
                    const data: AddPriceListElementProps = {
                        profileId: profileId,
                        price: values.price,
                        elementName: values.elementName
                    };
                    ProfileApi.addPriceListElement(data)
                        .then(res => {
                            setPriceList([...priceList, res.data.priceListElement])
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }}
            >
                <PriceListForm>
                    <FormInfo>Ustawienia cennika</FormInfo>
                    <FormGroup>
                        <LabelStyled htmlFor="elementName">Nazwa usługi</LabelStyled>
                        <FieldStyled id="elementName" name="elementName" placeholder="Nazwa usługi" />
                        <ErrorMessageStyled name="elementName" component="div" />
                    </FormGroup>
                    <FormGroup>
                        <LabelStyled htmlFor="price">Cena</LabelStyled>
                        <FieldStyled name="price" placeholder="Cena" id="price" />
                        <ErrorMessageStyled name="price" component="div" />
                    </FormGroup>
                    <FormGroup>
                        <SubmitButton type="submit">Dodaj nowy element cennika</SubmitButton>
                    </FormGroup>
                </PriceListForm>
            </Formik>
        </PriceListSettingsStyled>
    );
};

export default PriceListSettings;
