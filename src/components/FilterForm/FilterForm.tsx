import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import InputRange from "react-input-range";
import Select from "react-select";
import { ApplicationState } from "../../store";
import { filter } from "../../store/filters/actions";
import { FiltersState } from "../../store/filters/types";
import { FilterFormStyled, ResetButton, FormWrapper } from "./FilterForm.styled";
import { SubmitButton } from "../SharedStyledComponents/Form.styled";
import "react-input-range/lib/css/index.css";

const options = [
    { value: 1, label: "Konsultacja wstępna" },
    { value: 2, label: "Konsultacja kontrolna" },
    { value: 3, label: "Zakupy z dietetykiem" },
    { value: 4, label: "Dedykowany jadłospis" },
    { value: 5, label: "Pomiary" },
    { value: 6, label: "Testy FoodDetective" }
];

const cities = [
    { label: "Warszawa", value: "Warszawa" },
    { label: "Łódź", value: "Łódź" },
    { label: "Poznań", value: "Poznań" },
    { label: "Gdańsk", value: "Gdańsk" },
    { label: "Sopot", value: "Sopot" },
    { label: "Gdynia", value: "Gdynia" }
];

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const FilterForm = (props: Props) => {
    //filtry: miasto, cena - przedział, usługi: lista
    let { city, priceRange, services } = props.filters;

    return (
        <Formik
            initialValues={{
                city: city,
                priceRange: priceRange,
                services: services
            }}
            onSubmit={(values: FiltersState) => {
                console.log(values);
                props.filter(values);
                window.scrollTo(0, 0);
            }}
            render={({ setFieldValue, values, touched, setFieldTouched, errors }) => (
                <FormWrapper>
                    <ResetButton
                        onClick={() => {
                            setFieldValue("priceRange", {
                                min: 0,
                                max: 200
                            });
                            setFieldValue("city", "All");
                            setFieldValue("services", []);
                            const values = {
                                city: "All",
                                services: [],
                                priceRange: {
                                    min: 0,
                                    max: 200
                                }
                            };
                            props.filter(values);
                        }}
                    >
                        reset
                    </ResetButton>
                    <FilterFormStyled>
                        <Field name="city" component="select">
                            {cities.map((c, index) => {
                                return (
                                    <option key={index} value={c.value}>
                                        {c.label}
                                    </option>
                                );
                            })}
                            <option value="All">Wszystkie</option>
                        </Field>
                        <InputRange
                            maxValue={300}
                            minValue={0}
                            name="priceRange"
                            value={values.priceRange}
                            onChange={(value: any) => setFieldValue("priceRange", value)}
                        />
                        <Select
                            value={values.services}
                            onChange={(value: any) => setFieldValue("services", value)}
                            onBlur={() => setFieldTouched("services", true)}
                            error={errors.services}
                            touched={touched.services}
                            isMulti
                            options={options}
                            classNamePrefix="react-select"
                            placeholder="Usługi"
                        />

                        <SubmitButton type="submit">Filtruj</SubmitButton>
                    </FilterFormStyled>
                </FormWrapper>
            )}
        />
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { filters: state.filters };
};

const mapDispatchToProps = {
    filter
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
