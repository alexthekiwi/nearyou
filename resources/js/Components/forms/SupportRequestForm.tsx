import { useForm } from '@inertiajs/react';
import React from 'react';
import Button from '../common/Button';
import { handleChange } from '@/lib/forms';
import { useAuth } from '@/lib/auth';
import FormErrors from '../common/FormErrors';

export default function SupportRequestForm() {
    const { user } = useAuth();

    const { data, setData, post, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        subject: '',
        message: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post(route('support-requests.store'));
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormErrors errors={errors} />
            <fieldset>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={(event) =>
                            handleChange({ event, data, setData })
                        }
                    />
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </label>
                <label>
                    Email address
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(event) =>
                            handleChange({ event, data, setData })
                        }
                    />
                    {errors.email && (
                        <span className="error">{errors.email}</span>
                    )}
                </label>
                <label>
                    Phone number
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={data.phone}
                        onChange={(event) =>
                            handleChange({ event, data, setData })
                        }
                    />
                    {errors.phone && (
                        <span className="error">{errors.phone}</span>
                    )}
                </label>
                <label>
                    Subject
                    <select
                        name="subject"
                        id="subject"
                        onChange={(event) =>
                            handleChange({ event, data, setData })
                        }
                    >
                        <option value="">Select option</option>
                        <option value="account">Account issues</option>
                        <option value="listings">Listing assistance</option>
                        <option value="payments">Payment and billing</option>
                        <option value="report">Report a scam</option>
                        <option value="technical">Technical support</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                        <span className="error">{errors.subject}</span>
                    )}
                </label>
                <label>
                    Your message
                    <textarea
                        name="message"
                        id="message"
                        value={data.message}
                        onChange={(event) =>
                            handleChange({ event, data, setData })
                        }
                    />
                    {errors.message && (
                        <span className="error">{errors.message}</span>
                    )}
                </label>
            </fieldset>

            <div className="flex justify-end">
                <Button type="submit" theme="primary">
                    Send request
                </Button>
            </div>
        </form>
    );
}
