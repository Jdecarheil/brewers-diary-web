export * from '@/components/form-item';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormElement = {
  control: any;
  name: string;
  label: string;
  description: string;
  type?: string;
  disabled?: boolean;
};

export const FormElement = ({ name, control, label, description, type, disabled }: FormElement) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input disabled={disabled} {...field} type={type} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
