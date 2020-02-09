import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { ApplicationState } from "../../store";
import { SortingFormStyled } from "./SortingForm.styled";
import { Option, SubmitButton, FormGroup, LabelStyled } from "../SharedStyledComponents/Form.styled";
import { sort } from "../../store/sorting/actions";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const sortingTypes = [
    { value: "DATE_ASC", label: "Data - rosnąco" },
    { value: "DATE_DESC", label: "Data - malejąco" },
    { value: "REVIEW_ASC", label: "Ocena - rosnąco" },
    { value: "REVIEW_DESC", label: "Ocena - malejąco" }
];

const SortingForm = (props: Props) => {
    let { sorting } = props.sorting;

    return (
        <Formik
            initialValues={{
                sorting: sorting
            }}
            onSubmit={(values: any) => {
                console.log(values);
                props.sort(values.sorting);
            }}
            render={() => (
                <SortingFormStyled>
                    <LabelStyled htmlFor="sorting">Sortowanie</LabelStyled>
                    <FormGroup>
                        <Field name="sorting" component="select">
                            {sortingTypes.map((s, index) => {
                                return (
                                    <Option value={s.value} key={index}>
                                        {s.label}
                                    </Option>
                                );
                            })}
                        </Field>
                    </FormGroup>
                    <FormGroup>
                        <SubmitButton type="submit">Sortuj</SubmitButton>
                    </FormGroup>
                </SortingFormStyled>
            )}
        />
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { sorting: state.sorting };
};

const mapDispatchToProps = {
    sort
};

export default connect(mapStateToProps, mapDispatchToProps)(SortingForm);
