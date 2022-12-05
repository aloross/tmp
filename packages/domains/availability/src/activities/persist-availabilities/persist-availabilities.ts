import { Availability_Insert_Input, sdk } from '@tmp/generated-back'

const { UpsertAvailabilities } = sdk

export const persistAvailabilities = async (
  updatedAvailabilities: Availability_Insert_Input[],
) => {
  UpsertAvailabilities({ inputs: updatedAvailabilities })
}
